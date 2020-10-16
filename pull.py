import requests
import base64
import copy

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
                  generalTotal
                  oxygenTotal
                  icuTotal
                  hduTotal
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
      hospitals[id].append(hospital)

  return hospitals


def add_localities(localities):
  pass

def add_hospitals(hospitals):
  pass

data = get_data()
localities = get_localities(copy.deepcopy(data))
hospitals = get_hospitals(data)


# import json
# with open("data.json", 'w') as file:
#   json.dump(hospitals, file, indent=2)
