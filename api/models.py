from django.db import models
from django.contrib.auth.models import User

class Recipe(models.Model):
    user = models.ForeignKey(User, default=1, on_delete=models.CASCADE)

    imagePath = models.ImageField(upload_to="images/", blank=True, null=True)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'recipe'
        constraints = [
            models.UniqueConstraint(fields=['user', 'title'], name='unique recipe')
        ]

    def __str__(self):
        return self.title

class Ingredient(models.Model):
    title = models.CharField(max_length=200)
    amount = models.CharField(max_length=200)
    recipe = models.ForeignKey(Recipe, related_name='ingredients', on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class MealPlan(models.Model):
    user = models.ForeignKey(User, default=1, on_delete=models.CASCADE)

    day = models.CharField(max_length=20)
    week = models.IntegerField('week')
    year = models.IntegerField()

    breakfast = models.ForeignKey(Recipe, related_name='breakfast_plan', null=True, blank=True, on_delete=models.SET_NULL)
    lunch = models.ForeignKey(Recipe, related_name='lunch_plan', null=True, blank=True, on_delete=models.SET_NULL)
    dinner = models.ForeignKey(Recipe, related_name='dinner_plan', null=True, blank=True, on_delete=models.SET_NULL)

