from selenium import webdriver
import pandas as pd
from bs4 import BeautifulSoup as bs4
from location import get_location_info, get_contact_info
import os, sys, django, re, time
from pathlib import Path
from selenium.webdriver.chrome.options import Options

bedav_dir = str(Path(os.getcwd()).parent) + '/bedav'
sys.path.append(bedav_dir)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bedav.settings')
django.setup()

from hospitals.models import Hospital, Equipment

def get_data(driver, city):
  table = driver.find_element_by_id("dataTable").find_element_by_tag_name("tbody")
  rows = table.find_elements_by_tag_name("tr")

  data = pd.DataFrame(columns=["name", "gen_total", "ICU_total", "vent_total", "gen_occupied", "ICU_occupied", "vent_occupied", "city"])

  for row in rows:
    columns = row.find_elements_by_tag_name("td")[1:]
    hospital = {
      "name": columns[0].text.rstrip(),
      "ICU_total": int(columns[1].text),
      "ICU_occupied": int(columns[2].text),
      "gen_total": int(columns[4].text) + int(columns[7].text),
      "gen_occupied": int(columns[5].text) + int(columns[8].text),
      "vent_total": int(columns[-1].text),
      "vent_occupied": 0,
      "city": city
    }
    data = data.append(hospital, ignore_index=True)

  data[["gen_total", "ICU_total", "vent_total", "gen_occupied", "ICU_occupied", "vent_occupied"]] = data[["gen_total", "ICU_total", "vent_total", "gen_occupied", "ICU_occupied", "vent_occupied"]].applymap(lambda value: re.sub(',', '', str(value))).apply(pd.to_numeric, errors="coerce").applymap(lambda value: value if value > 0 else -1 * value)

  return data

def add_hospitals(data, locality_id):
  for index, item in data[["name", "city"]].iterrows():
    print(index)
    hospital = item.to_dict()

    def hospital_exists(name):
      obj = Hospital.objects.filter(name=name, locality_id=locality_id).first()

      if obj is None:
        return False

      return True

    if hospital_exists(hospital["name"]):
      continue

    args = {
      **hospital,
      "state": "Andhra Pradesh",
    }

    location_info = get_location_info(**args)
    hospital = { **hospital, **location_info }

    contact_info = get_contact_info(hospital["place_id"] if 'place_id' in hospital.keys() else {})
    hospital = { **hospital, **contact_info }

    hospital["district"] = "AP"
    hospital["locality_id"] = locality_id

    obj = Hospital(**hospital)
    obj.save()

def update_data(data, locality_id):
  current_time = time.time()
  for index, item in data.iterrows():
    equipment = []

    item = item.to_dict()
    hospital = Hospital.objects.filter(name=item["name"], locality_id=locality_id).first()

    print(hospital.name, hospital)

    available = {
      "gen": item["gen_total"] - item["gen_occupied"],
      "ICU": item["ICU_total"] - item["ICU_occupied"],
      "vent": item["vent_total"] - item["vent_occupied"]
    }

    for category, value in available.items():
      equipment.append({
        "available": value,
        "category": category,
        "total": item[category + "_total"],
        "time": current_time,
        "branch": hospital
      })

    for x in equipment:
      obj = Equipment(**x)
      obj.save()

def get_all():
  options = Options()
  # options.headless = True
  driver = webdriver.Chrome('./chromedriver', options=options)
  driver.get("http://dashboard.covid19.ap.gov.in/ims/hospbed_reports/")
  ids = [
    7, #Anantapur
    8, #Chittoor
    9, #East Godavari
    10, #Guntur
    11, #Krishna
    12, #Kurnool
    13, #prakasam
    14, #Spsr nellore
    15, #Srikakulam
    16, #Vishakapatanam
    17, #Vizianagaram
    18, #West godavari
    19, #Kadapa
  ]
  
  for i in range(0, len(ids)):
    time.sleep(5)
    table = driver.find_element_by_id("dataTable").find_element_by_tag_name("tbody")
    rows = table.find_elements_by_tag_name("tr")
    current_row = rows[i]
    columns = current_row.find_elements_by_tag_name("td")
    city = columns[0].text
    columns[1].find_element_by_tag_name("a").click()
    time.sleep(5)
    data = get_data(driver, city)
    print(data)
    add_hospitals(data, ids[i])
    update_data(data, ids[i])
    home_button = driver.find_element_by_class_name("breadcrumb-item").click()

get_all()
