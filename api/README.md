# bedav API

This directory contains a Django Project named API. The Django application serves a GraphQL API built using Graphene and Graphene Django and connected to the database via the Django ORM.

The GraphQL Schema Definition can be accessed at `/api/schema.graphql`

## Contributing

For general instructions on contributing and setting up the local development environment look at [CONTRIBUTING](../CONTRIBUTING.md).

Check out [MODELS](../) to view the Database Structure.

## Notes

Raw SQL Queries are used rather than the default ORM methods to get data from the Database, as complex SQL functionality such as joins and subqueries were lacking in the Django ORM. Using Raw SQL Queries reduced the required number of Queries to run and also made it much faster.
