"""This module defines all views used as part of the /api endpoints"""
import json

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework.response import Response
from rest_framework import status
from api import models
from .serializers import RecipeSerializer, MealPlanSerializer

@require_POST
def login_view(request):
    """This view defines the logic to login a user by username and password

    Code adapted from https://testdriven.io/blog/django-spa-auth/"""
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    if username is None or password is None:
        return JsonResponse({'detail': 'No user name or password provided.'}, status=400)

    user = authenticate(username=username, password=password)

    if user is None:
        return JsonResponse({'detail': 'Invalid credentials.'}, status=400)

    login(request, user)
    return JsonResponse({'detail': 'Successfully logged in.'})


def logout_view(request):
    """This view defines the logic to logout a user

    Code adapted from https://testdriven.io/blog/django-spa-auth/"""
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'User not logged in.'}, status=400)

    logout(request)
    return JsonResponse({'detail': 'Successfully logged out.'})

@require_POST
def register_view(request):
    """This view defines the logic to register a new user by username and password

    Code adapted from https://testdriven.io/blog/django-spa-auth/"""
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    if User.objects.filter(username=username).exists():
        return JsonResponse({'detail': 'Username is already taken'}, status=409)

    user = User.objects.create_user(username=username, email=username, password=password)
    if user is None:
        return JsonResponse({'detail': 'Something went wrong'}, status=500)

    login(request, user)

    return JsonResponse({'detail': 'Successfully registered and logged in.'})

class RecipeViewDetailed(APIView):
    """This view provides the functionality to GET and DELETE recipes"""
    parser_classes = (MultiPartParser,)

    def get(self, request, title):
        """GETs a single recipe"""
        recipe = models.Recipe.objects.get(user=request.user, title=title)
        serializer = RecipeSerializer(recipe)
        return Response(serializer.data)

    def delete(self, request, title):
        """DELETEs a single recipe"""
        recipe = models.Recipe.objects.filter(user=request.user, title=title)
        recipe.delete()
        return Response(status=status.HTTP_200_OK)

class RecipeView(APIView):
    """This view provides the logic to GET all recipes of a given user and POST a new recipe"""
    parser_classes = (MultiPartParser,)

    def get(self, request):
        """GETs all recipes of a given user"""
        recipe = models.Recipe.objects.filter(user=request.user)
        serializer = RecipeSerializer(recipe, many=True)
        return Response(serializer.data)

    def post(self, request):
        """POSTs a new recipe"""
        mut_data = request.data.copy()

        recipe_instance = None
        ingredients = mut_data.pop('ingredients')

        mut_data['user'] = request.user.id
        recipe_serializer = RecipeSerializer(data=mut_data)
        if recipe_serializer.is_valid():
            recipe_serializer.save()
            recipe_instance = recipe_serializer.instance
        else:
            return Response(recipe_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        for ingredient in ingredients:
            ingredient_json = json.loads(ingredient)
            models.Ingredient.objects.create(recipe=recipe_instance, **ingredient_json)

        return Response(recipe_serializer.data, status=status.HTTP_200_OK)

class MealPlanView(APIView):
    """This view provides the logic to GET meal plans"""
    parser_classes = (JSONParser,)

    def get(self, request, year, week):
        """GETs a meal plan defined by all recipes of a given week"""
        recipe = models.MealPlan.objects.filter(user=request.user, year=year, week=week)
        serializer = MealPlanSerializer(recipe, many=True)
        return Response(serializer.data)

class MealPlanPutView(APIView):
    """This view provides the logic to PUT meal plans
    If no meal plan is yet present in the database a new one will be created
    before making the adjustments"""
    parser_classes = (JSONParser,)

    def put(self, request, year, week, day, meal_type):
        """PUTs a new recipe for a given meal type (breakfast, lunch or dinner)"""
        user = request.user.id

        try:
            meal_plan = models.MealPlan.objects.get(user=user, year=year, week=week, day=day)
        except models.MealPlan.DoesNotExist:
            meal_plan = None

        if meal_plan is None:
            data = {'user':user, 'year':year,'week':week,'day':day}
            serializer = MealPlanSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                meal_plan = serializer.instance
            else:
                return Response(serializer.error, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        try:
            if request.data["title"] is not None:
                recipe = models.Recipe.objects.get(user=user, title=request.data["title"])
            else:
                recipe = None
        except models.Recipe.DoesNotExist:
            return JsonResponse({'detail': 'Recipe does not exist'}, status=400)

        if recipe is not None:
            serializer = MealPlanSerializer(meal_plan, data={"id":recipe.id}, partial=True)
        else:
            serializer = MealPlanSerializer(meal_plan, data={"id": -1}, partial=True)
        if serializer.is_valid():
            if meal_type == "breakfast":
                serializer.save(breakfast=recipe)
            elif meal_type == "lunch":
                serializer.save(lunch=recipe)
            elif meal_type == "dinner":
                serializer.save(dinner=recipe)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
