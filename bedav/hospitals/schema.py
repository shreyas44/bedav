import time
import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from .models import Hospital, Beds, ICU, Ventilators, Equipment
from math import radians, sin, cos, asin, sqrt
from django.contrib.gis.db.models.functions import GeometryDistance
from django.contrib.gis.geos import Point
from django.db.models import F
from django.db import connection
from collections import namedtuple

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

class HospitalType(graphene.ObjectType):
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

  id = graphene.NonNull(graphene.ID)
  name = graphene.String()
  website = graphene.String()
  phone = graphene.String()
  city = graphene.String()
  district = graphene.String()
  state = graphene.String()
  country = graphene.String()
  postal_code = graphene.Int()
  place_id = graphene.String()
  address = graphene.String()
  category = graphene.String()

  def resolve_distance(hospital, info):
    return round(hospital.distance, 1)

  class Meta:
    interfaces = (relay.Node, )
    name = "Hospital"

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

    def namedtuplefetch(cursor):
      desc = cursor.description
      nt_result = namedtuple('Hospital', [col[0] for col in desc])
      return [nt_result(*row) for row in cursor.fetchall()]

    def get_hospitals(order):
      joins = '''
        FULL OUTER JOIN (
          SELECT DISTINCT ON (branch_id)
          branch_id, available general_available, total general_total, (total - available) general_occupied
          FROM "Equipment" WHERE category = 'gen' ORDER BY branch_id, time DESC
        ) AS eq_gen ON eq_gen.branch_id = hos.id
        FULL OUTER JOIN (
          SELECT DISTINCT ON (branch_id)
          branch_id, available ICU_available, total ICU_total, (total - available) ICU_occupied
          FROM "Equipment" WHERE category = 'ICU' ORDER BY branch_id, time DESC
        ) AS eq_ICU ON eq_ICU.branch_id = hos.id
        FULL OUTER JOIN ( 
          SELECT DISTINCT ON (branch_id)
          branch_id, available HDU_available, total HDU_total, (total - available) HDU_occupied
          FROM "Equipment" WHERE category = 'HDU' ORDER BY branch_id, time DESC
        ) AS eq_HDU ON eq_HDU.branch_id = hos.id
        FULL OUTER JOIN (      
          SELECT DISTINCT ON (branch_id)
          branch_id, available ventilators_available, total ventilators_total, (total - available) ventilators_occupied
          FROM "Equipment" WHERE category = 'vent' ORDER BY branch_id, time DESC
        ) AS eq_vent ON eq_vent.branch_id = hos.id
      '''

      selections = '''
        eq_HDU.HDU_available, eq_HDU.HDU_total, eq_HDU.HDU_occupied,
        eq_gen.general_available, eq_gen.general_total, eq_gen.general_occupied,
        eq_ICU.ICU_available, eq_ICU.ICU_total, eq_ICU.ICU_occupied,
        eq_vent.ventilators_available as ventilators_used, eq_vent.ventilators_total, eq_vent.ventilators_occupied,
        hos.*,
        ((hos."location" <-> %s::geometry) / 1000) AS distance
      '''

      cursor = connection.cursor()

      if len(category_filters) > 0:
        where_claus = 'WHERE hos.name ILIKE %s AND hos.category IN %s'
        escaped_strings = [str(coords), '%' + search_query + '%', tuple(category_filters)]
      else:
        where_claus = 'WHERE hos.name ILIKE %s'
        escaped_strings = [str(coords), '%' + search_query + '%']

      query = f'''
        SELECT * FROM (
          SELECT 
          {selections}
          FROM "Hospitals" AS hos
          {joins}
          {where_claus}
        ) data
        ORDER BY COALESCE({order}, 0) {'DESC' if descending else 'ASC'}
      '''

      cursor.execute(query, escaped_strings)
      return namedtuplefetch(cursor)

    o = order_by

    if o not in ("distance", "name"):
      o = o.split("_")[::-1]
      o = '_'.join(o)
    
    hospitals = get_hospitals(o)

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