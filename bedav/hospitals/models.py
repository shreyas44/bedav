from django.db import models

# class Hospital(models.Model):
#   name = models.CharField(max_length=200)
#   email = models.CharField(max_length=200)
#   phone = models.CharField(max_length=20)

#   class Meta:
#     db_table = "Hospitals"

class Hospital(models.Model):
  name = models.CharField(max_length=200)
  website = models.CharField(max_length=3000, null=True)
  phone = models.CharField(max_length=20, null=True)
  latitude = models.FloatField(null=True)
  longitude = models.FloatField(null=True)
  city = models.CharField(max_length=200, null=True)
  district = models.CharField(max_length=200, null=True)
  state = models.CharField(max_length=200, null=True)
  country = models.CharField(max_length=200, default="India", null=True)
  postal_code = models.IntegerField(null=True)
  place_id = models.CharField(max_length=1000, null=True)
  address = models.CharField(max_length=1000, null=True)
  category = models.CharField(max_length=200) #gov hos, gov med, pri hos, pri med, covid

  class Meta:
    db_table = "Hospitals"

class Beds(models.Model):
  branch = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name='beds')
  available = models.PositiveIntegerField()
  total = models.PositiveIntegerField()
  time = models.FloatField()

  class Meta:
    db_table = "Beds"

class ICU(models.Model):
  branch = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name='ICU')
  available = models.PositiveIntegerField()
  total = models.PositiveIntegerField()
  time = models.FloatField()

  class Meta:
    db_table = "ICU"

class Ventilators(models.Model):
  branch = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name='ventilators')
  available = models.PositiveIntegerField()
  total = models.PositiveIntegerField()
  time = models.FloatField()

  class Meta:
    db_table = "Ventilators"



class Equipment(models.Model):
  branch = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name='equipment')
  category = models.CharField(max_length=200) # gen, HDU, ICU, vent
  available = models.PositiveIntegerField()
  total = models.PositiveIntegerField()
  time = models.FloatField()

  class Meta:
    db_table = "Equipment"
