import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from .models import Hospital, Beds, ICU, Ventilators

class HospitalSortField(graphene.Enum):
  NAME = "name"
  DISTANCE = "distance"
  CURRENT_BEDS = 'current_beds'
  CURRENT_ICU = "current_ICU"
  CURRENT_VENTILATORS = 'current_ventilators'
  TOTAL_BEDS = "total_beds"
  TOTAL_ICU = "total_ICU"
  TOTAL_VENTILATORS = "total_ventilators"

class HospitalType(DjangoObjectType):
  beds = graphene.Int()
  ICU = graphene.Int()
  ventilators = graphene.Int()
  total_beds = graphene.Int()
  total_ICU = graohene.Int()
  total_ventilators = graphene.Int()

  def resolve_beds(hospital, info):
    return hospital.beds.availabe

  def resolve_ICU(hospital, info):
    return hospital.ICU.available

  def resolve_ventilators(hospital, info):
    return hospital.ventilators.available

  def resolve_total_beds(hospital, info):
    return hospital.beds.total

  def resolve_total_ICU(hospital, info):
    return hospital.ICU.total

  def resolve_total_ventilators(hospital, info):
    return hospital.ventilators.total

  class Meta:
    model = Branch
    interfaces = (relay.Node, )
    name = "Hospital"
    exclude = ('equipment', )

class EquipmentType(DjangoObjectType):
  class Meta:
    model = Equipment
    interfaces = (relay.Node, )
    name = "Equipment"

class HospitalConnection(relay.Connection):
  class Meta:
    node = HospitalType

class Query(graphene.InputObjectType):
  hospitals = relay.ConnectionField(HospitalConnection, order_by=graphene.Argument(HospitalSortField), descending=graphene.Boolean(default_value=False))
  
  def resolve_hospitals(parent, info, order_by, descending, **kwargs):
    prefix = '-' if descending else ''

    def get_hospitals(order):
      order = prefix + order
      return Hospital.objects.order_by(order)

    if order_by == 'name':
      order = 'name'
    elif 'beds' in order_by:
      order = 'beds__total' if order_by == "total_beds" else "beds__available"
    elif 'ICU' in order_by:
      order = 'ICU__total' if order_by == "total_ICU" else "ICU__available"
    elif 'ventilators' in order_by:
      order = 'ventilators__total' if order_by == "total_ventilators" else "ventilators__available"

    return get_hospitals(order)

class NewHospitalMutationInput(graphene.InputObjectType):
  name = graphene.String()
  email = graphene.String()
  phone = graphene.Int()
  latitude = graphene.Float()
  longitude = graphene.Float()
  city = graphene.String()
  district = graphene.String()
  state = graphene.String()
  # country = graphene.String()

class NewHospitalMutation(graphene.Mutation):
  class Arguments:
    input = NewHospitalMutationInput()

  status = graphene.NonNull(graphene.Boolean)
  message = graphene.String()

  def mutate(parent, info, input):
    pass

