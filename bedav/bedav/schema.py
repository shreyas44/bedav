import graphene
from hospitals.schema import Query as HospitalQuery, Mutations as HospitalMutations

class Query(
  HospitalQuery,
  graphene.ObjectType
):
  node = graphene.relay.node.Field()

class Mutations(
  HospitalMutations,
  graphene.ObjectType
):
  pass

schema = graphene.Schema(query=Query, mutation=Mutations)
  