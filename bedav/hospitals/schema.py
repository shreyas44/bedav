import time
import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from .models import Hospital, Beds, ICU, Ventilators, Equipment
from math import radians, sin, cos, asin, sqrt
from django.contrib.gis.db.models.functions import GeometryDistance
from django.contrib.gis.geos import Point
from django.db.models import F
# from .forms import NewHospitalForm

def get_distance(hos_lat, user_lat, hos_lon, user_lon) -> float:
  hos_lat = radians(float(hos_lat))
  hos_lon = radians(float(hos_lat))
  user_lat = radians(float(user_lat))
  user_lon = radians(float(user_lon))
  lat_diff = hos_lat - user_lat
  lon_diff = hos_lon - user_lon

  a = sin(lat_diff / 2)**2 + cos(hos_lat) * cos(user_lat) * sin(lon_diff/2)**2
  c = 2 * asin(sqrt(a))

  distance =  c * 6371
  # distance = round(distance, 2)
  return distance

class HospitalSortField(graphene.Enum):
  NAME = "name"
  DISTANCE = "distance"
  AVAILABLE_GENERAL = 'available_general'
  AVAILABLE_HDU = "available_HDU"
  AVAILABLE_ICU = "available_ICU"
  AVAILABLE_VENTILATORS = 'available_ventilators'
  OCCUPIED_GENERAL = "occupied_general"
  OCCUPIED_HDU = "occupied_HDU"
  OCCUPIED_ICU = "occupied_ICU"
  USED_VENTILATORS = "used_ventilators"
  TOTAL_BEDS = "total_general"
  TOTAL_ICU = "total_ICU"
  TOTAL_HDU = "total_HDU"
  TOTAL_VENTILATORS = "total_ventilators"

class DataCategory(graphene.Enum):
  GENERAL = "gen"
  HDU = "HDU"
  ICU = "ICU"
  VENTLILATORS = "vent"

# class HospitalTypes(graphene.Enum):
#   GOVERNMENT_HOSPITAL = "gov hos"

def get_available(instance, category):
  obj = instance.equipment.filter(branch=instance, category=category).order_by('-time').first()

  if obj is None:
    return None

  return obj.available

def get_total(instance, category):
  obj = instance.equipment.filter(branch=instance, category=category).order_by('-time').first()

  if obj is None:
    return None

  return obj.total

def get_occupied(instance, category):
  obj = instance.equipment.filter(branch=instance, category=category).order_by('-time').first()

  if obj is None:
    return None

  return obj.total - obj.available

class HospitalType(DjangoObjectType):
  general_available = graphene.Int()
  ICU_available = graphene.Int()
  ventilators_available = graphene.Int()
  HDU_available = graphene.Int()
  general_total = graphene.Int()
  ICU_total = graphene.Int()
  ventilators_total = graphene.Int()
  HDU_total = graphene.Int()
  general_occupied = graphene.Int()
  ICU_occupied = graphene.Int()
  HDU_occupied = graphene.Int()
  ventilators_occupied = graphene.Int()
  distance = graphene.Float()

  def resolve_distance(hospital, info):
    return round(hospital.distance/1000, 1)

  def resolve_general_available(hospital, info):
    return get_available(hospital, "gen")

  def resolve_ICU_available(hospital, info):
    return get_available(hospital, "ICU")
    
  def resolve_HDU_available(hospital, info):
    return get_available(hospital, "HDU")

  def resolve_ventilators_available(hospital, info):
    return get_available(hospital, "vent")

  def resolve_general_total(hospital, info):
    return get_total(hospital, "gen")

  def resolve_ICU_total(hospital, info):
    return get_total(hospital, "ICU")

  def resolve_HDU_total(hospital, info):
    return get_total(hospital, "HDU")

  def resolve_ventilators_total(hospital, info):
    return get_total(hospital, "vent")

  def resolve_general_occupied(hospital, info):
    return get_occupied(hospital, "gen")

  def resolve_HDU_occupied(hospital, info):
    return get_occupied(hospital, "HDU")

  def resolve_ICU_occupied(hospital, info):
    return get_occupied(hospital, "ICU")

  def resolve_ventilators_occupied(hospital, info):
    return get_occupied(hospital, "vent")


  class Meta:
    model = Hospital
    interfaces = (relay.Node, )
    name = "Hospital"
    exclude = ('equipment', 'location')

class HospitalConnection(relay.Connection):
  class Meta:
    node = HospitalType

class Query(graphene.ObjectType):
  hospitals = relay.ConnectionField(HospitalConnection,
    order_by=graphene.Argument(HospitalSortField,
    required=False, default_value="distance"),
    descending=graphene.Boolean(default_value=False, required=False),
    category_filters=graphene.List(graphene.String, required=False, default_value=[]),
    lat=graphene.Float(required=False, default_value=0),
    lon=graphene.Float(required=False, default_value=0),
    search_query=graphene.String(required=False, default_value='')
  )
  
  def resolve_hospitals(parent, info, order_by, descending, category_filters, lat, lon, search_query, **kwargs):
    info.context.coords = {"lat": lat, "lon": lon}
    coords = Point(lon, lat, srid=4326)

    prefix = '-' if descending else ''

    def get_hospitals(order, equipment_category=None):
      old_order = order
      order = prefix + order

      if old_order != "distance":

        if len(category_filters) > 0:
          equipments = Equipment.objects.filter(category=equipment_category, branch__category__in=category_filters, branch__name__icontains=search_query).annotate(occupied=F('total')-F('available')).order_by(order, '-time', 'branch').distinct("branch").select_related("branch")
          equipments = list(equipments)
          equipments.sort(key=lambda equipment: equipment.__dict__[old_order], reverse=True if prefix == "-" else False)

          hospitals_a = [equipment.branch for equipment in equipments]

          for hospital in hospitals_a:
            hcoords = hospital.location.coords
            ucoords = (lon, lat)
            hospital.distance = get_distance(hcoords[1], coords[1], hcoords[0], coords[0]) 

          ids = [hospital.id for hospital in hospitals_a]
          hospitals_b = Hospital.objects.filter(category__in=category_filters, name__icontains=search_query).annotate(distance=GeometryDistance("location", coords)).exclude(id__in=ids)
        else:
          equipments = Equipment.objects.filter(category=equipment_category, branch__name__icontains=search_query).annotate(occupied=F('total')-F('available')).order_by('branch', '-time').distinct("branch").select_related("branch")
          equipments = list(equipments)
          equipments.sort(key=lambda equipment: equipment.__dict__[old_order], reverse=True if prefix == "-" else False)

          hospitals_a = [equipment.branch for equipment in equipments]
          
          for hospital in hospitals_a:
            hcoords = hospital.location.coords
            ucoords = (lon, lat)
            hospital.__dict__['distance'] = get_distance(hcoords[1], ucoords[1], hcoords[0], ucoords[0])

          ids = [hospital.id for hospital in hospitals_a]
          hospitals_b = Hospital.objects.filter(name__icontains=search_query).annotate(distance=GeometryDistance("location", coords)).exclude(id__in=ids)

        if descending:
          hospitals = hospitals_a + list(hospitals_b)
        else:
          hospitals = list(hospitals_b) + hospitals_a

      elif old_order == "distance":

        if len(category_filters) > 0:
          hospitals =  Hospital.objects.filter(category__in=category_filters, name__icontains=search_query).annotate(distance=GeometryDistance("location", coords)).order_by(order)
        else:
          hospitals = Hospital.objects.filter(name__icontains=search_query).annotate(distance=GeometryDistance("location", coords)).order_by(order)

      return hospitals

    o = order_by
    
    if o == "total_general":
      e_cat = "gen"
      hospitals = get_hospitals("total", equipment_category=e_cat)
    elif o == "total_ICU":
      e_cat = "ICU"
      hospitals = get_hospitals("total", equipment_category=e_cat)
    elif o == "total_HDU":
      e_cat = "HDU"
      hospitals = get_hospitals("total", equipment_category=e_cat)
    elif o == "total_ventilators":
      e_cat = "vent"
      hospitals = get_hospitals("total", equipment_category=e_cat)
    elif o == "available_general":
      e_cat = "gen"
      hospitals = get_hospitals("available", equipment_category=e_cat)
    elif o == "available_ICU":
      e_cat = "ICU"
      hospitals = get_hospitals("available", equipment_category=e_cat)

    elif o == "available_HDU":
      e_cat = "HDU"
      hospitals = get_hospitals("available", equipment_category=e_cat)

    elif o == "available_ventilators":
      e_cat = "vent"
      hospitals = get_hospitals("available", equipment_category=e_cat)

    elif o == "occupied_general":
      e_cat = "gen"
      hospitals = get_hospitals("occupied", equipment_category=e_cat)
      
    elif o == "occupied_ICU":
      e_cat = "ICU"
      hospitals = get_hospitals("occupied", equipment_category=e_cat)

    elif o == "occupied_HDU":
      e_cat = "HDU"
      hospitals = get_hospitals("occupied", equipment_category=e_cat)

    elif o == "occupied_ventilators":
      e_cat = "vent"
      hospitals = get_hospitals("occupied", equipment_category=e_cat)

    elif o == "name":
      hospitals = get_hospitals("name")

    elif o == "distance":
      hospitals = get_hospitals("distance")
    else:
      hospitals = get_hospitals("occupied", "general")

    # if order_by == 'name':
    #   order = 'name'
    # elif 'beds' in order_by:
    #   order = 'gen__total' if order_by == "total_gen" else "gen__available"
    # elif 'ICU' in order_by:
    #   order = 'ICU__total' if order_by == "total_ICU" else "ICU__available"
    # elif 'ventilators' in order_by:
    #   order = 'ventilators__total' if order_by == "total_ventilators" else "ventilators__available"
    # elif order_by == "distance":
    #   order = "distance"
    # else:
    #   order = "distance"

    return hospitals


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
  # new_hospital = NewHospitalMutation()
  # upload_data = UploadData()
  
  pass