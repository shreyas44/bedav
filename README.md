# Bedav
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
Bedav is a website that keeps a track of the number of available beds reserved for covid patients in multiple regions across India. It also provides additional information of the hospitals including contact information, website and directions.

## How does the website work?

The data for availability of beds in hospitals in scraped off official websites such as [BBMP](https://apps.bbmpgov.in/covidbedstatus/) using [Puppetteer](https://github.com/puppetteer/puppetteer) and Cheerio. This data is then added to a database in a uniform format.

This data is then exposed in the form of a [GraphQL API](https://bedav.org/playground)

Using the data the API provides, the website displays the relevant information.

#### Complete Stack:
- Scripts (TypeScript) - [Puppetteer](https://github.com/puppetteer/puppetteer), Cheerio
- API (TypeScript) - [Nexusjs](https://github.com/graphql-nexus/nexus), [Prisma](https://github.com/prisma/prisma), Apollo Server
- Frontend (JavaScript) - React, Apollo Client

> The website previously used python for the scripts, and GraphQL API which I wrote about [on Medium](https://medium.com/@shreyas.sreenivas/building-bedav-org-83ce6a61fab6). The tech stack for the front end still remains the same.

## Project Structure

There are three parts to the project

1. [API](/api) - A GraphQL API which provides access to the data in the database. It also includes the scripts that scrape the data, and get additional info using the Google Maps APIs
3. [Website](/website) - The front end website responsible for representing the data provided by the GraphQL API

To learn more about each project headover to their respective directories

## Local Setup

#### Install dependencies for the website and create a development build of it
```
cd website && yarn && yarn build:dev && cd ..
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

### API Keys (Optional)

You can add the API keys to `.env` in the root folder of the repository.

The following API keys are supported:
1. `MAPS_API_KEY` - A Google Maps API key with access to the Google Maps Places API and Google Maps Geocoding API
2. `MAPS_API_CLIENT_KEY` - A Google Maps API key with access to the Google Maps Javascript API

## Contributing

You can contribute to the [API](/api), or the [website](/website). To learn more about contributing headover to [CONTRIBUTING](/CONTRIBUTING.md).

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://bedav.org"><img src="https://avatars2.githubusercontent.com/u/46835608?v=4" width="100px;" alt=""/><br /><sub><b>Shreyas Sreenivas</b></sub></a><br /><a href="https://github.com/shreyas44/bedav/commits?author=shreyas44" title="Code">💻</a> <a href="https://github.com/shreyas44/bedav/commits?author=shreyas44" title="Documentation">📖</a> <a href="#design-shreyas44" title="Design">🎨</a> <a href="#ideas-shreyas44" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-shreyas44" title="Maintenance">🚧</a> <a href="https://github.com/shreyas44/bedav/pulls?q=is%3Apr+reviewed-by%3Ashreyas44" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://sudipto.ghosh.pro"><img src="https://avatars3.githubusercontent.com/u/11232940?v=4" width="100px;" alt=""/><br /><sub><b>Sudipto Ghosh</b></sub></a><br /><a href="https://github.com/shreyas44/bedav/commits?author=sudiptog81" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/jeremylgrice"><img src="https://avatars0.githubusercontent.com/u/12513606?v=4" width="100px;" alt=""/><br /><sub><b>Jeremy Grice</b></sub></a><br /><a href="https://github.com/shreyas44/bedav/commits?author=jeremylgrice" title="Documentation">📖</a></td>
    <td align="center"><a href="http://glyde.com.br"><img src="https://avatars0.githubusercontent.com/u/26071571?v=4" width="100px;" alt=""/><br /><sub><b>Thomas G. Lopes</b></sub></a><br /><a href="https://github.com/shreyas44/bedav/commits?author=TGlide" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->