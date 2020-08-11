from django.db import models

# class Hospital(models.Model):
#   name = models.CharField(max_length=200)
#   email = models.CharField(max_length=200)
#   phone = models.CharField(max_length=20)

#   class Meta:
#     db_table = "Hospitals"

class Branch(models.Model):
  name = models.CharField(max_length=200)
  email = models.CharField(max_length=200)
  phone = models.CharField(max_length=20)
  latitude = models.FloatField()
  longitude = models.FloatField()
  city = models.CharField(max_length=200)
  district = models.CharField(max_length=200)
  state = models.CharField(max_length=200)
  country = models.CharField(max_length=200)

  class Meta:
    db_table = "Branch"

class Beds(models.Model):
  branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name='beds')
  available = models.PositiveIntegerField()
  total = models.PositiveIntegerField()
  time = models.FloatField()

  class Meta:
    db_table = "Beds"

class ICU(models.Model):
  branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name='ICU')
  available = models.PositiveIntegerField()
  total = models.PositiveIntegerField()
  time = models.FloatField()

  class Meta:
    db_table = "ICU"

class Ventilators(models.Model):
  branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name='ventilators')
  available = models.PositiveIntegerField()
  total = models.PositiveIntegerField()
  time = models.FloatField()

  class Meta:
    db_table = "Ventilators"



# class Equipment(models.Model):
#   branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name='equipments')
#   category = models.CharField(max_length=200) # ICU, general, ventilators
#   available = models.PositiveIntegerField()
#   total = models.PositiveIntegerField()
#   time = models.FloatField()

#   class Meta:
#     db_table = "Equipment"
