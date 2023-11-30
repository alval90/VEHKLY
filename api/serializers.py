from .models import MealPlan, Recipe, Ingredient
from rest_framework.serializers import (ModelSerializer, HiddenField, CurrentUserDefault)

class IngredientSerializer(ModelSerializer):
    class Meta:
        model = Ingredient
        fields = '__all__'

class RecipeSerializer(ModelSerializer):
    ingredients = IngredientSerializer(many=True, required=False)

    class Meta:
        model = Recipe
        fields = '__all__'

class MealPlanSerializer(ModelSerializer):
    breakfast = RecipeSerializer(many=False, required=False, allow_null=True)
    lunch = RecipeSerializer(many=False, required=False, allow_null=True)
    dinner = RecipeSerializer(many=False, required=False, allow_null=True)

    class Meta:
        model = MealPlan
        fields = '__all__'
        optional_fields = ['breakfast', 'lunch', 'dinner']
