# Models

## Localities

Different Localities (City or District)

- **name** - Name of the area, mostly the District
- **state** - The state in which the area is located
- **country** - Country of the locality (India by default)

## Hospitals

- **name** - Name of the Hospital
- **website** - Website of the Hospital (null if data not available)
- **phone** - Phone number of the Hospital (null if data not available)
- **location** - Coordinates of the Hospital (PostGIS Geometry Object | Point Object in Django)
- **place_id** - Place ID of Hospital on Google
- **category** - Category of Hospital. Different categories based on Location. [add Localities.md]
- **locality_id** - Foreign Key of the Locality the Hospital belongs to
- **postal_code** - Postal Code of the Hospital

- **city** - City of the Hospital
- **district** - District of the Hospital
- **state** - State of the Hospital
- **country** - Country of the Hospital

## Equipment

The availability of Beds in ICU, HDU, General Ward, General Ward or Ventilators available

- **category** - Availibility of which category. Value can be the following:
  * gen - General Ward
  * oxy - General Ward with Oxygen
  * icu - Intensive Care Unit
  * hdu - High Dependency Unit
  * vent - Ventilators

- **available** - No. of Units available
- **total** - Total no. of Units
- **time** - Unix timestamp of the time the data was added
- **branch_id** - Foreign key to the Hospital the data is for


