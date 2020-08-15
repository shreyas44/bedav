import graphene
from graphene import relay
from hospitals.schema import (
  Query as HospitalQuery
)

class Query(HospitalQuery, graphene.ObjectType):
  node = relay.Node.Field()


schema = graphene.Schema(query=Query)
  