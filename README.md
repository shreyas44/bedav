# bedav (https://bedav.org)
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
Bedav is a website that keeps a track of the number of available beds reserved for covid patients in multiple regions across India. It also provides additional information of the hospitals including contact information, website and directions.

## How does the website work?

The data for availability of beds in hospitals in scraped off official websites such as [BBMP](https://apps.bbmpgov.in/covidbedstatus/) using Selenium, Beautiful Soup 4 in Python.
This data is then added to a database in a uniform format.

A Django server then reads the data from the database and exposes the data in the form of a GraphQL API at https://bedav.org/graphql. You can play with the API at https://bedav.org/playground.

Using the data the API provides, the website displays the relevant information.

#### Complete Stack:
- Scripts (Python) - Selenium, Requests, Beautiful Soup 4
- API (Python) - Graphene, Django
- Frontend (JavaScript) - React, Apollo Client

To learn more about the tech stack, checkout my [blog post on Medium](https://medium.com/@shreyas.sreenivas/building-bedav-org-83ce6a61fab6)

## Project Structure

There are three parts to the project

1. [API](/api) - A GraphQL API which provides access to the data in the database
2. [Scripts](/scripts) - Python scripts which scrape hospital data and the availability of beds from websites, get additional data of the hospitals such as co-ordinates, phone number and website and add it to the database
3. [Website](/website) - The front end website responsible for representing the data provided by the GraphQL API

To learn more about each project headover to their respective directories

## Local Setup

#### Install npm dependencies for the website and create a development build of it
```
cd website && npm install && npm run build-dev && cd ..
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

#### Optional - Configure Environment

If you have access to a Google Maps API key that has access to the JavaScript Maps API, then you can go to `website/map.dev.env` and set `MAPS_API_KEY` to your Google Maps API key to view a complete version of the Google Maps on the website.

## Contributing

You can contribute to the [scripts](/scripts), the [API](/api) or the [website](/website) itself. To learn more about contributing headover to [CONTRIBUTING](/CONTRIBUTING.md).

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://bedav.org"><img src="https://avatars2.githubusercontent.com/u/46835608?v=4" width="100px;" alt=""/><br /><sub><b>Shreyas Sreenivas</b></sub></a><br /><a href="https://github.com/shreyas44/bedav/commits?author=shreyas44" title="Code">💻</a> <a href="https://github.com/shreyas44/bedav/commits?author=shreyas44" title="Documentation">📖</a> <a href="#design-shreyas44" title="Design">🎨</a> <a href="#ideas-shreyas44" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-shreyas44" title="Maintenance">🚧</a> <a href="https://github.com/shreyas44/bedav/pulls?q=is%3Apr+reviewed-by%3Ashreyas44" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://sudipto.ghosh.pro"><img src="https://avatars3.githubusercontent.com/u/11232940?v=4" width="100px;" alt=""/><br /><sub><b>Sudipto Ghosh</b></sub></a><br /><a href="https://github.com/shreyas44/bedav/commits?author=sudiptog81" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->