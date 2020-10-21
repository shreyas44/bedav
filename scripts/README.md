# bedav scripts

The Python files in this directory are scripts that scrape data off of official websites of the region as mentioned in the file name. 

## Contributing

For general instructions on contributing and setting up the local development environment look at [CONTRIBUTING](../CONTRIBUTING.md).

Check out [MODELS](../) to view the Database Structure.

## Notes

`location.py` contains code that fetches extra information about a Hospital such as phone number, website, co-ordinates, etc. using the Google Maps Places and Geocoding API's.

`pull.py` runs code that pulls data from https://bedav.org and add its your database for the development environment. 

Rest of the files in the directory are scripts which get data for the region as given by the filename.
