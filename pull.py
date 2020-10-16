import requests

URL = "https://bedav.org/graphql"

def get_query(query, variables={}):
  req = requests.post(URL, json={"query": query, "variables": variables})

  if req.status_code == 200:

    return req.json()

  print(req.status_code)
  raise BaseException("URL was unreachable")

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

  return get_query(query)

def get_localities(data):
  pass

def get_hospitals(data):
  pass

def add_localities(localities):
  pass

def add_hospitals(hospitals):
  pass

data = get_data()