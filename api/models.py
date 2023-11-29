from django.db import models
from django.contrib.auth.models import User

class MealPlan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    day = models.CharField()
    week = models.IntegerField('week')
    year = models.IntegerField()

    breakfast = models.ForeignKey(Recipe, 'breakfast_plan', null=True, blank=True, on_delete=models.SET_NULL)
    lunch = models.ForeignKey(Recipe, 'lunch_plan', null=True, blank=True, on_delete=models.SET_NULL)
    dinner = models.ForeignKey(Recipe, 'dinner_plan', null=True, blank=True, on_delete=models.SET_NULL)

class Recipe(models.Model):
    image = models.ImageField(upload_to="images/", blank=True, null=True)
    name = models.CharField(max_length=200)
    description = models.TextField()

class Ingredient(models.Model):
    name = models.CharField(max_length=200)
    amount = models.CharField(max_length=200)
    recipe = models.ForeignKey(Recipe, 'ingredients', on_delete=models.CASCADE)

