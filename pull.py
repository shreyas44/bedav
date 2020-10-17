import requests
import base64
import copy
import sys, os
from pathlib import Path
import django
from django.contrib.gis.geos import Point

bedav_dir = str(Path(os.getcwd())) + '/api'
sys.path.append(bedav_dir)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings')
django.setup()

from hospitals.models import Locality, Hospital, Equipment

URL = "https://bedav.org/graphql"

def get_query(query, variables={}):
  req = requests.post(URL, json={"query": query, "variables": variables})

  if req.status_code == 200:

    return req.json()

  print(req.status_code)
  raise BaseException("URL was unreachable")

def get_id(string):
  id = base64.b64decode(string).decode("utf-8")
  id = id.split(":")[1]

  return int(id)
    
def get_data():
  query = '''
      query {
      localities(first: 100000) {
        edges {
          node {
            id
            name
            state
            country
            lastUpdated
            hospitals(first:100000){
              edges {
                node {
                  name
                  generalAvailable
                  oxygenAvailable
                  icuAvailable
                  hduAvailable
                  ventilatorsAvailable
                  generalTotal
                  oxygenTotal
                  icuTotal
                  hduTotal
                  ventilatorsTotal
                  website
                  district
                  city
                  phone
                  state
                  country
                  postalCode
                  placeId
                  address
                  category
                  latitude
                  longitude
                }
              }
            }
          }
        }
      }
    }
  '''

  def format_data(data):
    f_data = data["data"]
    f_data = {
      "localities": []
    }

    for locality in data["data"]["localities"]["edges"]:
      locality = locality["node"]
      hospitals = locality["hospitals"]["edges"]
      f_hospitals = []

      for hospital in hospitals:
        f_hospitals.append(hospital["node"])

      f_data["localities"].append({
        **locality,
        "hospitals": f_hospitals
      })

    return f_data

  return format_data(get_query(query))

def get_localities(data):
  localities = data["localities"]


  for index, locality in enumerate(localities):
    locality["id"] = get_id(locality["id"])
    del locality["hospitals"]
    del locality["lastUpdated"]
    localities[index] = locality

  return localities

def get_hospitals(data):
  localities = data["localities"]
  hospitals = {}

  for locality in localities:
    id = get_id(locality["id"])
    if locality["id"] not in hospitals.keys():
      hospitals[id] = []
    
    for hospital in locality["hospitals"]:
      hospital["time"] = locality["lastUpdated"]
      hospitals[id].append(hospital)

  return hospitals

def add_localities(localities):
  for locality in localities:
    obj = Locality.objects.filter(id=locality["id"]).first()

    if obj is None:
      obj = Locality(**locality)
      obj.save()

def add_hospitals(hospitals):

  def add_data(hospital):
    def add(data):
      obj = Equipment(**data)
      obj.save()

    params = {
      "branch_id": hospital["id"],
      "category": "oxy",
      "time": hospital["time"]
    }

    if hospital["oxygenTotal"] is not None:
      params["category"] = "oxy"
      params["available"] = hospital["oxygenAvailable"]
      params["total"] = hospital["oxygenTotal"]
      add(params)

    if hospital["generalTotal"] is not None:
      params["category"] = "gen"
      params["available"] = hospital["generalAvailable"]
      params["total"] = hospital["generalTotal"]
      add(params)

    if hospital["hduTotal"] is not None:
      params["category"] = "HDU"
      params["available"] = hospital["hduAvailable"]
      params["total"] = hospital["hduTotal"]
      add(params)

    if hospital["icuTotal"] is not None:
      params["category"] = "ICU"
      params["available"] = hospital["icuAvailable"]
      params["total"] = hospital["icuTotal"]
      add(params)

    if hospital["ventilatorsTotal"] is not None:
      params["category"] = "vent"
      params["available"] = hospital["ventilatorsAvailable"]
      params["total"] = hospital["ventilatorsTotal"]
      add(params)

  for locality_id, locality_hospitals in hospitals.items():
    for hospital in locality_hospitals:
      params = {
        "name": hospital["name"],
        "website": hospital["website"],
        "phone": hospital["phone"],
        "location": Point(hospital["longitude"], hospital["latitude"]),
        "place_id": hospital["placeId"],
        "category": hospital["category"],
        "locality_id":locality_id,
        "postal_code": hospital["postalCode"],
        "city": hospital["city"],
        "district": hospital["district"],
        "state": hospital["state"],
      }
      obj = Hospital.objects.filter(name=hospital["name"], locality_id=locality_id).first()

      if obj is None:
        obj = Hospital(**params)
        obj.save()

      hospital["id"] = obj.id
      add_data(hospital)


data = get_data()
localities = get_localities(copy.deepcopy(data))
hospitals = get_hospitals(data)
add_localities(localities)
add_hospitals(hospitals)


import json
with open("data.json", 'w') as file:
  json.dump(hospitals, file, indent=2)
