# bedav (https://bedav.org)
Find the number of available beds in hospitals across India

## How does the website work?

The data for availility of beds in hospitals in scraped off official websites such as [BBMP](https://apps.bbmpgov.in/covidbedstatus/) using Selenium, Beautiful Soup 4 in Python.
This data is then added to a database in a uniform format.

A Django server then reads the data from the database and exposes the data in the form of a GraphQL API at https://bedav.org/graphql. You can play with the API at https://bedav.org/palyground.

Using the data the API provides, the website displays the relevant information.

#### Complete Stack:
- Scripts (Python) - Selenium, Requests, Beautiful Soup 4
- API (Python) - Graphene, Django
- Frontend (JavaScript) - React, Apollo Client

To learn more about the tech stack, checkout my [blog post on Medium](https://medium.com/@shreyas.sreenivas/building-bedav-org-83ce6a61fab6)



### Local Setup

#### Install npm dependencies
```
npm install
```

#### Create and run docker containers
```
docker-compose up -d
```

You can run `docker-compose logs` to view the logs from all the docker containers.

Once the containers are built and running, you can go to `http://localhost/` to view the website, `http://localhost/playground` to view the GraphQL Playground.

To stop the docker containers run `docker-compose down`.

When you run `docker-compose up` and `docker-compose down` make sure you're in the root directory of the project.

*Note: the first time you run docker-compose up, the docker images will have to be built, which may take a while*

### Optional - Configure Environment

If you have access to a Google Maps API key that has access to the JavaScript Maps API, then you can go to `map.dev.env` and set `MAPS_API_KEY` to your Google Maps API key to view a complete version of the Google Maps on the website.

## Contributing

You can contribute to the scripts that scrape the data, the API or the website itself. To learn more about contributing headover to [CONTRIBUTING](/CONTRIBUTING.md).