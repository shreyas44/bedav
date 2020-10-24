import time, base64
import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from .models import Hospital, Equipment, Locality
from math import radians, sin, cos, asin, sqrt
from django.contrib.gis.db.models.functions import GeometryDistance
from django.contrib.gis.geos import Point
from django.db.models import F
from django.db import connection
from collections import namedtuple

def namedtuplefetch(cursor, name):
      desc = cursor.description
      nt_result = namedtuple(name, [col[0] for col in desc])
      return [nt_result(*row) for row in cursor.fetchall()]

def get_id(encoded_id, is_int=True):
  id = base64.b64decode(encoded_id).decode("utf-8")
  id = id.split(":")[1]

  if is_int:
    return int(id)

  return id

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
  OCCUPIED_VENTILATORS = "occupied_ventilators"
  TOTAL_GENERAL = "total_general"
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
  oxygen_available = graphene.Int()
  icu_available = graphene.Int()
  ventilators_available = graphene.Int()
  hdu_available = graphene.Int()
  general_total = graphene.Int()
  oxygen_total = graphene.Int()
  icu_total = graphene.Int()
  ventilators_total = graphene.Int()
  hdu_total = graphene.Int()
  general_occupied = graphene.Int()
  oxygen_occupied = graphene.Int()
  icu_occupied = graphene.Int()
  hdu_occupied = graphene.Int()
  ventilators_occupied = graphene.Int()
  distance = graphene.Float()
  locality = graphene.Field("hospitals.schema.LocalityType")

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
  latitude = graphene.Float()
  longitude = graphene.Float()

  def resolve_distance(hospital, info):
    return round(hospital.distance, 1)

  def resolve_locality(hospital, info):
    return Locality.objects.filter(id=hospital.locality_id).first()

  class Meta:
    interfaces = (relay.Node, )
    name = "Hospital"

class HospitalConnection(relay.Connection):
  class Meta:
    node = HospitalType

class LocalityType(DjangoObjectType):
  total = graphene.Int()
  available = graphene.Int()
  occupied = graphene.Int()
  last_updated = graphene.Float()
  hospitals = relay.ConnectionField(HospitalConnection,
    order_by=graphene.Argument(HospitalSortField,
    required=False, default_value="distance"),
    descending=graphene.Boolean(default_value=False, required=False),
    category_filters=graphene.List(graphene.String, required=False, default_value=[]),
    lat=graphene.Float(required=False, default_value=0),
    lon=graphene.Float(required=False, default_value=0),
    search_query=graphene.String(required=False, default_value='')
  )

  def resolve_hospitals(locality, info, order_by, descending, category_filters, lat, lon, search_query, **kwargs):
    info.context.coords = {"lat": lat, "lon": lon}
    coords = Point(lon, lat, srid=4326)


    def get_hospitals(order):
      joins = '''
        FULL OUTER JOIN (
          SELECT DISTINCT ON (branch_id)
          branch_id, available general_available, total general_total, (total - available) general_occupied
          FROM "Equipment" WHERE category = 'gen' ORDER BY branch_id, time DESC
        ) AS eq_gen ON eq_gen.branch_id = hos.id
        FULL OUTER JOIN (
          SELECT DISTINCT ON (branch_id)
          branch_id, available icu_available, total icu_total, (total - available) icu_occupied
          FROM "Equipment" WHERE category = 'ICU' ORDER BY branch_id, time DESC
        ) AS eq_ICU ON eq_ICU.branch_id = hos.id
        FULL OUTER JOIN (
          SELECT DISTINCT ON (branch_id)
          branch_id, available hdu_available, total hdu_total, (total - available) hdu_occupied
          FROM "Equipment" WHERE category = 'HDU' ORDER BY branch_id, time DESC
        ) AS eq_HDU ON eq_HDU.branch_id = hos.id
        FULL OUTER JOIN (
          SELECT DISTINCT ON (branch_id)
          branch_id, available ventilators_available, total ventilators_total, (total - available) ventilators_occupied
          FROM "Equipment" WHERE category = 'vent' ORDER BY branch_id, time DESC
        ) AS eq_vent ON eq_vent.branch_id = hos.id
        FULL OUTER JOIN (
          SELECT DISTINCT ON (branch_id)
          branch_id, available oxygen_available, total oxygen_total, (total - available) oxygen_occupied
          FROM "Equipment" WHERE category = 'oxy' ORDER BY branch_id, time DESC
        ) AS eq_oxy ON eq_oxy.branch_id = hos.id
      '''

      selections = '''
        eq_HDU.hdu_available, eq_HDU.hdu_total, eq_HDU.hdu_occupied,
        eq_gen.general_available, eq_gen.general_total, eq_gen.general_occupied,
        eq_oxy.oxygen_available, eq_oxy.oxygen_total, eq_oxy.oxygen_occupied,
        eq_ICU.icu_available, eq_ICU.icu_total, eq_ICU.icu_occupied,
        eq_vent.ventilators_available, eq_vent.ventilators_total, eq_vent.ventilators_occupied,
        hos.name, hos.website, hos.phone, hos.location, hos.city, hos.district, hos.state, hos.country, hos.postal_code, hos.place_id, hos.address, hos.category, hos.locality_id,
        encode(('Hospital:' || hos.id)::bytea, 'base64') id,
        ST_X(hos.location::geometry) as longitude, ST_Y(hos.location::geometry) as latitude,
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
        WHERE data.locality_id = {locality.id} AND distance IS NOT NULL AND data.category != 'pri covid'
        AND (data.hdu_total IS NOT NULL OR data.icu_total IS NOT NULL OR data.ventilators_total IS NOT NULL or general_total IS NOT NULL)
        ORDER BY COALESCE({order}, {"''" if order == 'name' else 0}) {'DESC' if descending else 'ASC'}
      '''

      cursor.execute(query, escaped_strings)
      return namedtuplefetch(cursor, "Hospital")

    o = order_by

    if o not in ("distance", "name"):
      o = o.split("_")[::-1]
      o = '_'.join(o)

    hospitals = get_hospitals(o)

    return hospitals

  class Meta:
    model = Locality
    name = "Locality"
    interfaces = (relay.Node, )

class LocalityConnection(relay.Connection):
  class Meta:
    node = LocalityType

class CountryType(graphene.ObjectType):
  total = graphene.Int()
  available = graphene.Int()
  occupied = graphene.Int()
  last_updated = graphene.Float()

  class Meta:
    name = "Country"

class Query(graphene.ObjectType):
  hospitals = relay.ConnectionField(HospitalConnection,
    order_by=graphene.Argument(HospitalSortField,
    required=False, default_value="distance"),
    descending=graphene.Boolean(default_value=False, required=False),
    category_filters=graphene.List(graphene.String, required=False, default_value=[]),
    search_query=graphene.String(required=False, default_value='')
  )

  hospital = graphene.Field(HospitalType, id=graphene.NonNull(graphene.ID), lat=graphene.Float(default_value=0), lon=graphene.Float(default_value=0))

  localities = relay.ConnectionField(LocalityConnection)
  locality = graphene.Field(LocalityType, name=graphene.String())

  country = graphene.Field(CountryType)

  def resolve_hospitals(parent, info, order_by, descending, category_filters, lat, lon, search_query, **kwargs):
    info.context.coords = {"lat": lat, "lon": lon}
    coords = Point(lon, lat, srid=4326)

   
    def get_hospitals(order):
      joins = '''
        FULL OUTER JOIN (
          SELECT DISTINCT ON (branch_id)
          branch_id, available general_available, total general_total, (total - available) general_occupied
          FROM "Equipment" WHERE category = 'gen' ORDER BY branch_id, time DESC
        ) AS eq_gen ON eq_gen.branch_id = hos.id
        FULL OUTER JOIN (
          SELECT DISTINCT ON (branch_id)
          branch_id, available icu_available, total icu_total, (total - available) icu_occupied
          FROM "Equipment" WHERE category = 'ICU' ORDER BY branch_id, time DESC
        ) AS eq_ICU ON eq_ICU.branch_id = hos.id
        FULL OUTER JOIN (
          SELECT DISTINCT ON (branch_id)
          branch_id, available hdu_available, total hdu_total, (total - available) hdu_occupied
          FROM "Equipment" WHERE category = 'HDU' ORDER BY branch_id, time DESC
        ) AS eq_HDU ON eq_HDU.branch_id = hos.id
        FULL OUTER JOIN (
          SELECT DISTINCT ON (branch_id)
          branch_id, available ventilators_available, total ventilators_total, (total - available) ventilators_occupied
          FROM "Equipment" WHERE category = 'vent' ORDER BY branch_id, time DESC
        ) AS eq_vent ON eq_vent.branch_id = hos.id
      '''

      selections = '''
        eq_HDU.hdu_available, eq_HDU.hdu_total, eq_HDU.hdu_occupied,
        eq_gen.general_available, eq_gen.general_total, eq_gen.general_occupied,
        eq_ICU.icu_available, eq_ICU.icu_total, eq_ICU.icu_occupied,
        eq_vent.ventilators_available, eq_vent.ventilators_total, eq_vent.ventilators_occupied,
        hos.name, hos.website, hos.phone, hos.location, hos.city, hos.district, hos.state, hos.country, hos.postal_code, hos.place_id, hos.address, hos.category, hos.locality_id,
        encode(('Hospital:' || hos.id)::bytea, 'base64') id,
        ST_X(hos.location::geometry) as longitude, ST_Y(hos.location::geometry) as latitude,
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
        ORDER BY COALESCE({order}, {"''" if order == 'name' else 0}) {'DESC' if descending else 'ASC'}
      '''

      cursor.execute(query, escaped_strings)
      return namedtuplefetch(cursor, "Hospital")

    o = order_by

    if o not in ("distance", "name"):
      o = o.split("_")[::-1]
      o = '_'.join(o)

    hospitals = get_hospitals(o)

    return hospitals

  def resolve_hospital(parent, info, id, lat, lon, **kwargs):
    coords=Point(lon, lat, srid=4326)

    def namedtuplefetch(cursor):
      desc = cursor.description
      nt_result = namedtuple('Hospital', [col[0] for col in desc])
      return [nt_result(*row) for row in cursor.fetchall()]

    joins = '''
      FULL OUTER JOIN (
        SELECT DISTINCT ON (branch_id)
        branch_id, available general_available, total general_total, (total - available) general_occupied
        FROM "Equipment" WHERE category = 'gen' ORDER BY branch_id, time DESC
      ) AS eq_gen ON eq_gen.branch_id = hos.id
      FULL OUTER JOIN (
        SELECT DISTINCT ON (branch_id)
        branch_id, available icu_available, total icu_total, (total - available) icu_occupied
        FROM "Equipment" WHERE category = 'ICU' ORDER BY branch_id, time DESC
      ) AS eq_ICU ON eq_ICU.branch_id = hos.id
      FULL OUTER JOIN (
        SELECT DISTINCT ON (branch_id)
        branch_id, available hdu_available, total hdu_total, (total - available) hdu_occupied
        FROM "Equipment" WHERE category = 'HDU' ORDER BY branch_id, time DESC
      ) AS eq_HDU ON eq_HDU.branch_id = hos.id
      FULL OUTER JOIN (
        SELECT DISTINCT ON (branch_id)
        branch_id, available ventilators_available, total ventilators_total, (total - available) ventilators_occupied
        FROM "Equipment" WHERE category = 'vent' ORDER BY branch_id, time DESC
      ) AS eq_vent ON eq_vent.branch_id = hos.id
      FULL OUTER JOIN (
        SELECT DISTINCT ON (branch_id)
        branch_id, available oxygen_available, total oxygen_total, (total - available) oxygen_occupied
        FROM "Equipment" WHERE category = 'oxy' ORDER BY branch_id, time DESC
      ) AS eq_oxy ON eq_oxy.branch_id = hos.id
    '''

    selections = '''
      eq_HDU.hdu_available, eq_HDU.hdu_total, eq_HDU.hdu_occupied,
      eq_gen.general_available, eq_gen.general_total, eq_gen.general_occupied,
      eq_oxy.oxygen_available, eq_oxy.oxygen_total, eq_oxy.oxygen_occupied,
      eq_vent.ventilators_available, eq_vent.ventilators_total, eq_vent.ventilators_occupied,
      eq_ICU.icu_available, eq_ICU.icu_total, eq_ICU.icu_occupied,
      hos.name, hos.website, hos.phone, hos.location, hos.city, hos.district, hos.state, hos.country, hos.postal_code, hos.place_id, hos.address, hos.category, hos.locality_id,
      encode(('Hospital:' || hos.id)::bytea, 'base64') id,
      ST_X(hos.location::geometry) as longitude, ST_Y(hos.location::geometry) as latitude,
      ((hos."location" <-> %s::geometry) / 1000) AS distance
    '''

    query = f'''
      SELECT {selections}
      FROM "Hospitals" AS hos
      {joins}
      WHERE id=%s
    '''

    cursor = connection.cursor()

    cursor.execute(query, [str(coords), get_id(id)])
    hospital = namedtuplefetch(cursor)[0]

    return hospital

  def resolve_localities(parent, info, **kwargs):
    localities = Locality.objects.raw("""
        SELECT "Locality".*, MAX(c.time) as last_updated, SUM(c.total) total, SUM(c.available) available, SUM(c.occupied) occupied FROM "Locality"
        INNER JOIN (
          SELECT hos.id, hos.name, hos.locality_id, SUM(available) available, SUM(total) total, SUM(total - available) occupied, a.time
          FROM "Hospitals" as hos
          INNER JOIN (
            SELECT MAX(time) as time, branch_id 
            FROM "Equipment"
            GROUP BY branch_id
          ) AS a ON a.branch_id = hos.id
          INNER JOIN (
            SELECT available, total, category, branch_id, time
            FROM "Equipment"
          ) AS b on b.branch_id = hos.id AND b.time = a.time
          WHERE hos.category != 'pri covid' OR hos.category IS null
          GROUP BY hos.id, a.time
          ORDER BY hos.name
        ) c on "Locality".id = c.locality_id
        GROUP BY "Locality".id
    """)

    return localities

  def resolve_locality(parent, info, name, **kwargs):
    name = ' '.join(name.split('-'))
    locality = Locality.objects.raw("""
      SELECT "Locality".*, MAX(c.time) as last_updated, SUM(c.total) total, SUM(c.available) available, SUM(c.occupied) occupied FROM "Locality"
      INNER JOIN (
        SELECT hos.id, hos.name, hos.locality_id, SUM(available) available, SUM(total) total, SUM(total - available) occupied, a.time
        FROM "Hospitals" as hos
        INNER JOIN (
          SELECT MAX(time) as time, branch_id
          FROM "Equipment"
          GROUP BY branch_id
        ) AS a ON a.branch_id = hos.id
        INNER JOIN (
          SELECT available, total, category, branch_id, time
          FROM "Equipment"
        ) AS b on b.branch_id = hos.id AND b.time = a.time
        WHERE hos.category != 'pri covid'
        GROUP BY hos.id, a.time
        ORDER BY hos.name
      ) c on "Locality".id = c.locality_id
      WHERE ("Locality".name || ' ' || "Locality".state ILIKE %s)
      GROUP BY "Locality".id
    """, [name])

    if len(locality) == 0:
      raise KeyError("Invalid locality passed")

    return locality[0]

  def resolve_country(parent, info, **kwargs):
      query = """
        SELECT SUM(total) total, SUM(available) available, SUM(occupied) occupied, MAX(last_updated) last_updated
        FROM (
          SELECT "Locality".*, MAX(c.time) as last_updated, SUM(c.total) total, SUM(c.available) available, SUM(c.occupied) occupied FROM "Locality"
          INNER JOIN (
            SELECT hos.id, hos.name, hos.locality_id, SUM(available) available, SUM(total) total, SUM(total - available) occupied, a.time
            FROM "Hospitals" as hos
            INNER JOIN (
              SELECT MAX(time) as time, branch_id
              FROM "Equipment"
              GROUP BY branch_id
            ) AS a ON a.branch_id = hos.id
            INNER JOIN (
              SELECT available, total, category, branch_id, time
              FROM "Equipment"
            ) AS b on b.branch_id = hos.id AND b.time = a.time
            GROUP BY hos.id, a.time
            ORDER BY hos.name
          ) c on "Locality".id = c.locality_id
          GROUP BY "Locality".id
          ) d
      """
      cursor = connection.cursor()
      cursor.execute(query)

      return namedtuplefetch(cursor, "Country")[0]

# Mutaions

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

    return UploadData(status=True)

class Mutations(graphene.ObjectType):
  # new_hospital = NewHospitalMutation()
  # upload_data = UploadData()

  pass
