import re, os, sys, django, time
from pathlib import Path
import pandas as pd
import numpy as np
import requests
from bs4 import BeautifulSoup as bs
from location import get_location_info, get_contact_info

bedav_dir = str(Path(os.getcwd()).parent) + '/bedav'
sys.path.append(bedav_dir)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bedav.settings')
django.setup()

from hospitals.models import Hospital, Equipment

def get_bangalore_data():
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

data = get_bangalore_data()
print(len(data))

def add_bangalore_hospitals():
    for index, item in data[['name','category']].iterrows():
        hospital = {
            "name": item.loc['name'],
            "category": item.loc['category'],
        }

        # print(item)

        def hospital_exists(name, place_id=None):
            # if place_id:
            #     obj = Hospital.objects.filter(place_id=place_id).first()
            # else:
            obj = Hospital.objects.filter(name=name).first() 

            if obj is None:
                return False
            
            return True

        if hospital_exists(hospital['name']):
            continue

        location_info = get_location_info(item.loc['name'])
        hospital = {**hospital, **location_info}
        
        contact_info = get_contact_info(hospital['place_id']) if 'place_id' in hospital.keys() else {}
        hospital = {**hospital, **contact_info}
        
        obj = Hospital(**hospital)
        obj.save()

        print(index, hospital)

add_bangalore_hospitals()

def update_bangalore_data():
    for index, item in data.iterrows():
        equipment = []

        name = item.loc['name']
        obj = Hospital.objects.filter(name=name).first()
        print(name, obj)
        
        available = {
            "gen":item.loc['gen_total'] - item.loc['gen_occupied'],
            "ICU":item.loc['ICU_total'] - item.loc['ICU_occupied'],
            "HDU":item.loc['HDU_total'] - item.loc['HDU_occupied'],
            "vent":item.loc['vent_total'] - item.loc['vent_occupied'],
        }
        
        for category, value in available.items():
            equipment.append({
                "available": value,
                "category": category,
                "total": item.loc[category + "_total"],
                "time": time.time(),
                "branch": obj
            })

        for x in equipment:
            obj = Equipment(**x)
            obj.save()

update_bangalore_data()



# save equipment
