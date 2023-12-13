"""This module defines all serializers used to transform model data"""
from rest_framework.serializers import ModelSerializer
from .models import MealPlan, Recipe, Ingredient

class IngredientSerializer(ModelSerializer):
    """Serializes ingredients"""
    class Meta:
        model = Ingredient
        fields = '__all__'

class RecipeSerializer(ModelSerializer):
    """Serializes recipes"""
    ingredients = IngredientSerializer(many=True, required=False)

    class Meta:
        model = Recipe
        fields = '__all__'

class MealPlanSerializer(ModelSerializer):
    """Serializes meal plans"""
    breakfast = RecipeSerializer(many=False, required=False, allow_null=True)
    lunch = RecipeSerializer(many=False, required=False, allow_null=True)
    dinner = RecipeSerializer(many=False, required=False, allow_null=True)

    class Meta:
        model = MealPlan
        fields = '__all__'
        optional_fields = ['breakfast', 'lunch', 'dinner']
