import time
import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from .models import Hospital, Beds, ICU, Ventilators, Equipment
from .forms import NewHospitalForm

class HospitalSortField(graphene.Enum):
  NAME = "name"
  DISTANCE = "distance"
  CURRENT_BEDS = 'current_beds'
  CURRENT_ICU = "current_ICU"
  CURRENT_VENTILATORS = 'current_ventilators'
  TOTAL_BEDS = "total_beds"
  TOTAL_ICU = "total_ICU"
  TOTAL_VENTILATORS = "total_ventilators"

class DataCategory(graphene.Enum):
  GENERAL = "gen"
  HDU = "HDU"
  ICU = "ICU"
  VENTLILATORS = "vent"

class HospitalType(DjangoObjectType):
  general = graphene.Int()
  ICU = graphene.Int()
  ventilators = graphene.Int()
  total_general = graphene.Int()
  total_ICU = graohene.Int()
  total_ventilators = graphene.Int()

  def resolve_general(hospital, info):
    return hospital.equipment.filter(branch=hospital, category="gen").order_by('-time').first().available

  def resolve_ICU(hospital, info):
    return hospital.equipment.filter(branch=hospital, category="ICU").order_by('-time').first().available

  def resolve_ventilators(hospital, info):
    return hospital.equipment.filter(branch=hospital, category="vent").order_by('-time').first().available

  def resolve_total_general(hospital, info):
    return hospital.equipment.filter(branch=hospital, category="gen").order_by('-time').first().total

  def resolve_total_ICU(hospital, info):
    return hospital.equipment.filter(branch=hospital, category="ICU").order_by('-time').first().total

  def resolve_total_ventilators(hospital, info):
    return hospital.equipment.filter(branch=hospital, category="vent").order_by('-time').first().total

  class Meta:
    model = Hospital
    interfaces = (relay.Node, )
    name = "Hospital"
    exclude = ('equipment', )

class HospitalConnection(relay.Connection):
  class Meta:
    node = HospitalType

class Query(graphene.InputObjectType):
  hospitals = relay.ConnectionField(HospitalConnection, order_by=graphene.Argument(HospitalSortField), descending=graphene.Boolean(default_value=False), category_filters=graphene.List(graphene.String), lat=graphene.Float(), lon=graphene.Float())
  
  def resolve_hospitals(parent, info, order_by, descending, category_filters, lat, lon, **kwargs):
    prefix = '-' if descending else ''

    def get_hospitals(order):
      order = prefix + order

      if len(category_filters) > 0:
        return Hospital.objects.filter(category__in=category_filters).order_by(order)
      else:
        return Hospital.objects.order_by(order)

    if order_by == 'name':
      order = 'name'
    elif 'beds' in order_by:
      order = 'gen__total' if order_by == "total_gen" else "gen__available"
    elif 'ICU' in order_by:
      order = 'ICU__total' if order_by == "total_ICU" else "ICU__available"
    elif 'ventilators' in order_by:
      order = 'ventilators__total' if order_by == "total_ventilators" else "ventilators__available"

    return get_hospitals(order)

class NewHospitalInput(graphene.InputObjectType):
  name = graphene.String()
  email = graphene.String()
  phone = graphene.Int()
  latitude = graphene.Float()
  longitude = graphene.Float()
  city = graphene.String()
  district = graphene.String()
  state = graphene.String()
  # country = graphene.String()

  total = graphene.Int()
  available = graphene.Int()
  category = graphene.Argument(DataCategory)

class NewHospitalMutation(graphene.Mutation):
  class Arguments:
    input = NewHospitalInput()

  status = graphene.NonNull(graphene.Boolean)
  message = graphene.String()

  def mutate(parent, info, input):
    status = False
    message = None
    form = NewHospitalForm(**input)

    if form.is_valid():
      form.save()
      status = True
    else:
      error = form.errors.values()[0]
      message = error['message']

    return NewHospitalMutation(status=status, message=message)

class UploadtDataInput(graphene.InputObjectType):
  category = DataCategory()
  total = graphene.Int()
  available = graphene.Int()
  hospital_name = graphene.String()

class UploadData(graphene.Mutation):
  class Arguments:
    input = DataCategory()

  status = graphene.NonNull(graphene.Boolean)
  message = graphene.String()

  def mutate(parent, info, input):
  #   def save_object(model):
    hospital = Hospital.objects.get(name=input.hospital_name)
    obj = Equipment(time=time.time(), total=input.total, available=input.available, hopsital=hospital, category=input.category)
    obj.save()

    # if input.category == "ventilators":
    #   save_object(Ventilators)
    # elif input.category == "ICU":
    #   save_object(ICU)
    # elif input.category == "beds":
    #   save_object(Beds)

    return UploatData(status=True)

class Mutations(graphene.ObjectType):
  new_hospital = NewHospitalMutation()
  upload_data = UploadData()
    

#https://www.google.com/maps/dir/12.9123753,77.7063437/Jayanagar+General+Hospital,+32nd+Cross,+4th+B+Block,+beside+Rajiv+Gandhi+Health+Institute,+Tilak+Nagar,+Jayanagar,+Bengaluru,+Karnataka+560041/@12.9201935,77.6149278,13z/data=!3m1!4b1!4m17!1m6!3m5!1s0x3bae15a840000001:0xbfd7355ffa3eee92!2sJayanagar+General+Hospital!8m2!3d12.9262377!4d77.5928008!4m9!1m1!4e1!1m5!1m1!1s0x3bae15a840000001:0xbfd7355ffa3eee92!2m2!1d77.5928008!2d12.9262377!3e0

#https://www.google.com/maps/dir/12.9123564,77.7063747/Onesta+Gandhi+Bazaar,+%2390,+First+Floor,+Gandhi+Bazaar+Main+Rd,+Basavanagudi,+Bengaluru,+Karnataka+560004/@12.9614445,77.5389895,13z/data=!4m13!1m2!2m1!1sOnesta!4m9!1m1!4e1!1m5!1m1!1s0x3bae15f393b0cb11:0xa55b67ec5183acc9!2m2!1d77.5689764!2d12.9472641!3e0