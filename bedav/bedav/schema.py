import graphene
from hospitals.schema import Query as HospitalQuery

class Query(
  HospitalQuery,
  graphene.ObjectType
):
  node = graphene.relay.node.Field()

schema = graphene.Schema(query=Query)
  