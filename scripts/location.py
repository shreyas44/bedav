import requests, urllib, json
from django.contrib.gis.geos import Point

KEY = "AIzaSyDMJnJXbyp-pH4xaWY8_S1RI-mUEV1EzB0"

def get_location_info(name=None, city='', state='', country='India', address=None):
    ret_data = {}

    if address is None:
      url_address =  f'{name}, {city}, {state}, {country}'
    else:
      url_address = f'{name}, {address}{f", {city}" if city.lower() not in address.lower() else ""}{f", {state}" if state.lower() not in address.lower() else ""}{f", {country}" if country.lower() not in address.lower() else ""}'

    header = {'key':  KEY, "address": url_address}
    url = "https://maps.googleapis.com/maps/api/geocode/json?" + urllib.parse.urlencode(header)
    print(url)

    data = requests.get(url)
    data = json.loads(data.content.decode('utf-8'))

    result = data['results']

    if len(result) > 0:
        result = result[0]
    else:
        return {}

    ret_data['address'] = result['formatted_address']
    ret_data['place_id'] = result['place_id']

    # get lat and long
    location = result['geometry']['location']
    ret_data['location'] = Point(location['lng'], location['lat'])

    address = result['formatted_address']

    for component in result['address_components']:
        try:
            _type = component['types'][0]
            value = component['long_name']

            if _type == 'postal_code':
                field = 'postal_code'

                if len(value) > 6:
                    continue
            elif _type == 'country':
                field = 'country'
            elif _type == 'administrative_area_level_1':
                field = 'state'
            elif _type == 'administrative_area_level_2':
                field = 'district'
            elif component['types'] == ['locality', 'political']:
                field = 'city'
            else:
                continue

            ret_data[field] = value
        except IndexError:
            pass

    return ret_data

def get_contact_info(place_id):
    header = {
        'key': KEY,
        'place_id': place_id,
        'fields': 'name,international_phone_number,website'
    }

    url = "https://maps.googleapis.com/maps/api/place/details/json?" + urllib.parse.urlencode(header)

    data = json.loads(requests.get(url).content.decode('utf-8'))
    result = data['result']

    print(result)


    return {
        "phone": result['international_phone_number'] if 'international_phone_number' in result.keys() else None,
        "website": result['website'] if 'website' in result.keys() else None
    }

def get_place_id(name):
   header = {'key':  KEY, "address": name}
   url = "https://maps.googleapis.com/maps/api/geocode/json?" + urllib.parse.urllencode(header) 

   return json.loads(request.get(url).content.decode('utf-8'))['results'][0]['place_id']
