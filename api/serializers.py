from rest_framework import serializers
from .models import MealPlan, Recipe, Ingredient

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = '__all__'

class RecipeSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True)

    class Meta:
        model = Recipe
        fields = '__all__'

class MealPlanSerializer(serializers.ModelSerializer):
    breakfast = RecipeSerializer(many=False, required=False, allow_null=True)
    lunch = RecipeSerializer(many=False, required=False, allow_null=True)
    dinner = RecipeSerializer(many=False, required=False, allow_null=True)

    class Meta:
        model = MealPlan
        fields = '__all__'
        optional_fields = ['breakfast', 'lunch', 'dinner']
