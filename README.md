# bedav
Find the number of available beds in hospitals across India

## How does the website work?

The data for availility of beds in hospitals in scraped off official websites such as [BBMP](https://apps.bbmpgov.in/covidbedstatus/) using Selenium, Beautiful Soup 4 in Python.
This data is then added to a database in a uniform format.

A Django server then reads the data from the database and exposes the data in the form of a GraphQL API at https://bedav.org/graphql. You can play with the API at https://bedav.org/palyground.

Using the data the API provides, the website displays the relevant information.

#### Complete Stack:
- Scraping Scripts (Python) - Selenium, Beautiful Soup 4
- API (Python) - Graphene, Django
- Frontend (JavaScript) - React, Apollo Client

To learn more about the tech stack, checkout my [blog post on Medium](https://medium.com/@shreyas.sreenivas/building-bedav-org-83ce6a61fab6)

## Contributing

You can contribute to the scripts that scrape the data, the API or the website itself.

To know more about contributing to the scripts responsible for scraping the data headover to the */scripts* directory.

To know more about contributing to the **api** headover to the */api* directory.

To know more about contributing to the website headover to the */web* directory.
