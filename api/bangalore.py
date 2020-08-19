import re, os, sys, django, time
from pathlib import Path
import pandas as pd
import numpy as np
import requests
from bs4 import BeautifulSoup as bs
from location import get_location_info, get_contact_info
from selenium import webdriver

bedav_dir = str(Path(os.getcwd()).parent) + '/bedav'
sys.path.append(bedav_dir)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bedav.settings')
django.setup()

from hospitals.models import Hospital, Equipment

def old_get_bangalore_data():
    page = requests.get("https://apps.bbmpgov.in/covidbedstatus/")
    source = page.content
    source = re.sub(r'SR. NO.</td>', "SR. NO.</th>", source.decode('utf-8'))

    soup = bs(source, 'html.parser')

    data = pd.DataFrame(columns=["name", "category", "gen_total", "HDU_total", "ICU_total", "vent_total", "gen_occupied", "HDU_occupied", "ICU_occupied", "vent_occupied"])

    ids = {
        'governmenthospital': "gov hos",
        'government_medical_college': "gov med",
        'private_hospital': "pri hos",
        'private_medical_college': "pri med",
        'covid_care_centers': "covid",
    }

    structure = ['gen', 'HDU', 'ICU', 'ICU Vent', 'total', 'gen', 'HDU', 'ICU', 'ICU Vent', 'total'] # total, occupied, net

    for key, value in ids.items():
        div = soup.find("div", {"id": key})
        rows = div.find_all("tr")
        rows = rows[3:]
        
            
        for row in rows:
            columns = row.find_all("td")[1:]
            
            if value == "covid":
                columns = columns[:-10]
            else: 
                columns = columns[:-5]
            values = [column.text.strip() for column in columns]
            
            if values[0] == "Total":
                continue
            
            values = {
                "name": values[0],
                "gen_total": int(values[1]),
                "HDU_total": int(values[2]),
                "ICU_total": int(values[3]),
                "vent_total": int(values[4]),
                "gen_occupied": int(values[6]),
                "HDU_occupied": int(values[7]),
                "ICU_occupied": int(values[8]),
                "vent_occupied": int(values[9]),
                "category": value
            }
            
            
            data = data.append(values, ignore_index=True)
            
    data[["gen_total", "HDU_total", "ICU_total", "vent_total", "gen_occupied", "HDU_occupied", "ICU_occupied", "vent_occupied"]] = data[["gen_total", "HDU_total", "ICU_total", "vent_total", "gen_occupied", "HDU_occupied", "ICU_occupied", "vent_occupied"]].apply(pd.to_numeric)
    data['name'] = data.name.str.replace(r' +', ' ', regex=True)

    return data

def get_bangalore_data():
    driver = webdriver.Chrome("/Users/shreyas/Documents/Summer-2020/Projects/bedav/api/chromedriver")
    driver.get("https://bbmpproject.in/bbmp-reports/")

    data = pd.DataFrame(columns=["name", "category", "gen_total", "HDU_total", "ICU_total", "vent_total", "gen_occupied", "HDU_occupied", "ICU_occupied", "vent_occupied"])

    ids = {
        "GovernmentHospitalsDetail": "gov hos",
        "GovernmentMedical": "gov med",
        "PrivateHospitals": "pri hos",
        "privateMedicalHospitals": "pri med",
        "cccTable": "covid",
    }

    for id in ids.keys():

        while True:
            source = bs(driver.page_source, 'html.parser')
            table = source.find("table", {"id": id})
            table = table.find("tbody")
            rows = table.find_all("tr")

            for row in rows:
                columns = row.find_all("td")
                columns = [column.text.strip() for column in columns] 
                
                print(columns)

                if ids[id] == "covid":
                    hospital = {
                        "name": columns[1],
                        "category": ids[id],
                        "gen_total": columns[2],
                        "gen_occupied": columns[3]
                    }
                else:
                    hospital = {
                        "name": columns[1],
                        "category": ids[id],
                        "gen_total": columns[2],
                        "HDU_total": columns[3],
                        "ICU_total": columns[4],
                        "vent_total": columns[5],
                        "gen_occupied": columns[7],
                        "HDU_occupied": columns[8],
                        "ICU_occupied": columns[9],
                        "vent_occupied": columns[10]
                    }

                data = data.append(hospital, ignore_index=True)

            next_button = driver.find_element_by_id(f'{id}_next')
            next_button_class = next_button.get_attribute("class")

            if "disable" in next_button_class:
                break

            next_button.click()

    driver.close()

    data[["gen_total", "HDU_total", "ICU_total", "vent_total", "gen_occupied", "HDU_occupied", "ICU_occupied", "vent_occupied"]] = data[["gen_total", "HDU_total", "ICU_total", "vent_total", "gen_occupied", "HDU_occupied", "ICU_occupied", "vent_occupied"]].applymap(lambda value: re.sub(',', '', str(value))).apply(pd.to_numeric, errors="coerce")
    data['name'] = data.name.str.replace(r' +', ' ', regex=True)

    return data

def add_bangalore_hospitals(data):
    for index, item in data[['name','category']].iterrows():
        hospital = {
            "name": item.loc['name'],
            "category": item.loc['category'],
        }

        def hospital_exists(name, place_id=None):
            obj = Hospital.objects.filter(name=name).first() 

            if obj is None:
                return False
            
            return True

        if hospital_exists(hospital['name']):
            continue

        location_info = get_location_info(item.loc['name'], "Bangalore", "Karnataka")
        hospital = {**hospital, **location_info}
        
        contact_info = get_contact_info(hospital['place_id']) if 'place_id' in hospital.keys() else {}
        hospital = {**hospital, **contact_info}
        
        obj = Hospital(**hospital)
        obj.save()

        print(index, hospital)

def refetch_info():
    hospitals = Hospital.objects.all()
    for hospital in hospitals:
        location_info = get_location_info(hospital.name, "Bangalore", "Karnataka")
        if location_info != {}:
            hospital.location = location_info['location']
            hospital.address = location_info['address']
            hospital.place_id = location_info['place_id']
            hospital.state = location_info['state']
            hospital.country = location_info['country']
            hospital.district = location_info['district']
            hospital.city = location_info['city']
        
            contact_info = get_contact_info(hospital.place_id)
            hospital.phone = contact_info['phone']
            hospital.website = contact_info['website']

            hospital.save()

def update_bangalore_data(data):
    current_time = time.time()
    for index, item in data.iterrows():
        equipment = []

        name = item.loc['name']
        obj = Hospital.objects.filter(name=name).first()
        print(name, obj)
        
        if item.loc['category'] == "covid":
            available = {
                "gen": item.loc['gen_total'] - item.loc['gen_occupied']
            }
        else:
            available = {
                "gen": item.loc['gen_total'] - item.loc['gen_occupied'],
                "ICU": item.loc['ICU_total'] - item.loc['ICU_occupied'],
                "HDU": item.loc['HDU_total'] - item.loc['HDU_occupied'],
                "vent": item.loc['vent_total'] - item.loc['vent_occupied'],
            }
        
        for category, value in available.items():
            equipment.append({
                "available": value,
                "category": category,
                "total": item.loc[category + "_total"],
                "time": current_time,
                "branch": obj
            })

        for x in equipment:
            obj = Equipment(**x)
            obj.save()

data = get_banaglore_data()
add_bangalore_hospitals(data)
update_bangalore_data(data)

# refetch_info()



# save equipment
