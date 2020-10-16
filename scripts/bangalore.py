import re
import os
import sys
import django
import time
from pathlib import Path
import pandas as pd
import numpy as np
import requests
from bs4 import BeautifulSoup as bs
from location import get_location_info, get_contact_info

bedav_dir = str(Path(os.getcwd()).parent) + '/api'
sys.path.append(bedav_dir)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings')
django.setup()

from hospitals.models import Hospital, Equipment

def get_bangalore_data():
    def get_phone(string):
        phone = string.strip()
        phone = phone.split('/')
        phone = [a.strip() for a in phone]
        phone = f'+91 {phone[1]}'
        return phone

    # driver = webdriver.Chrome("/Users/shreyas/Documents/Summer-2020/Projects/bedav/api/chromedriver")
    # driver.get("https://bbmpproject.in/bbmp-reports/")
    page = requests.get("https://bbmpproject.in/chbms-reports/")
    page_source = page.text

    def replace(source, rep_id):
        local_page_source = source.rsplit("GovernmentMedical", 1)
        return rep_id.join(local_page_source)

    page_source = replace(page_source, "cccTable")
    page_source = replace(page_source, "privateMedicalHospitals")
    page_source = replace(page_source, "PrivateHospitals")

    data = pd.DataFrame(columns=["name", "category", "gen_total", "HDU_total", "ICU_total", "vent_total",
                                 "gen_occupied", "HDU_occupied", "ICU_occupied", "vent_occupied", "address", "phone", "hotel"])

    ids = {
        "GovernmentHospitalsDetail": "gov hos",
        "GovernmentMedical": "gov med",
        "PrivateHospitals": "pri hos",
        "privateMedicalHospitals": "pri med",
        "cccTable": "covid",
        # "InPrivateHospitals": "pri covid"
    }

    for id in ids.keys():
        source = bs(page_source, 'html.parser')
        table = source.find("table", {"id": id})
        table = table.find("tbody")
        rows = table.find_all("tr")

        for row in rows:
            columns = row.find_all("td")
            columns = [column.text.strip() for column in columns]

            if(columns[0] == ''):
                break

            print(columns)

            if ids[id] == "covid":
                hospital = {
                    "name": columns[1],
                    "category": ids[id],
                    "gen_total": columns[2],
                    "gen_occupied": columns[3]
                }
            elif ids[id] == "pri covid":
                hospital = {
                    "name": f'{columns[1]} - {columns[2]}',
                    "category": ids[id],
                    "gen_total": columns[5],
                    "gen_occupied": columns[6],
                    "phone": get_phone(columns[3]),
                    "address": f'{columns[2]}, {columns[4]}',
                    "hotel": columns[2].strip()
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

    data[["gen_total", "HDU_total", "ICU_total", "vent_total", "gen_occupied", "HDU_occupied", "ICU_occupied", "vent_occupied"]] = data[["gen_total", "HDU_total", "ICU_total",
                                                                                                                                         "vent_total", "gen_occupied", "HDU_occupied", "ICU_occupied", "vent_occupied"]].applymap(lambda value: re.sub(',', '', str(value))).apply(pd.to_numeric, errors="coerce")
    data["address"] = data.address.str.strip()
    data["address"] = data.address.str.replace(r' +', ' ', regex=True)
    data['name'] = data.name.str.replace(r' +', ' ', regex=True)

    return data


def add_bangalore_hospitals(data):
    for index, item in data[['name', 'category', 'phone', 'address', "hotel"]].iterrows():
        hospital = {
            "name": item.loc['name'],
            "category": item.loc['category'],
            "locality_id": 1
        }

        if not pd.isna(item.loc["phone"]):
            hospital["phone"] = item.loc["phone"]

        if not pd.isna(item.loc["address"]):
            hospital["address"] = item.loc["address"]

        def hospital_exists(name, place_id=None):
            obj = Hospital.objects.filter(
                name=name, city__icontains="Bengaluru").first()

            if obj is None:
                return False

            return True

        if hospital_exists(hospital['name']):
            continue

        if pd.isna(item.loc["address"]):
            location_info = get_location_info(
                item.loc['name'], "Bangalore", "Karnataka")
        else:
            location_info = get_location_info(
                address=item.loc['address'], name=item.loc["hotel"], city="Bangalore", state="Karnataka")

        hospital = {**hospital, **location_info}

        contact_info = get_contact_info(
            hospital['place_id']) if 'place_id' in hospital.keys() else {}
        hospital = {**contact_info, **hospital}

        obj = Hospital(**hospital)
        obj.save()

        print(index, hospital)


def refetch_info():
    hospitals = Hospital.objects.all()
    for hospital in hospitals:
        location_info = get_location_info(
            hospital.name, "Bangalore", "Karnataka")
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

        if item.loc['category'] in ("covid", "pri covid"):
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


data = get_bangalore_data()
add_bangalore_hospitals(data)
update_bangalore_data(data)

# refetch_info()


# save equipment
