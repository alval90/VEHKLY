import json

from django import forms
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework.response import Response
from rest_framework import status
from api import models
from .serializers import IngredientSerializer, RecipeSerializer, MealPlanSerializer

# Der Code zur login_, logout_ und session_view ist angelehnt an das Tutorial https://testdriven.io/blog/django-spa-auth/
# Teile des Codes wurden identisch uebernommen.
@require_POST
def login_view(request):
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
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'User not logged in.'}, status=400)

    logout(request)
    return JsonResponse({'detail': 'Successfully logged out.'})

@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'isAuthenticated': True})

@require_POST
def register_view(request):
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

class IngredientView(APIView):
    parser_classes = (JSONParser,)

    def post(self, request, name):
        serializer = IngredientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RecipeViewDetailed(APIView):
    parser_classes = (MultiPartParser,)

    def get(self, request, title):
        recipe = models.Recipe.objects.get(user=request.user, title=title)
        serializer = RecipeSerializer(recipe)
        return Response(serializer.data)

    def delete(self, request, title):
        recipe = models.Recipe.objects.filter(user=request.user, title=title)
        recipe.delete()
        return Response(status=status.HTTP_200_OK)

class RecipeView(APIView):
    parser_classes = (MultiPartParser,)

    def get(self, request):
        recipe = models.Recipe.objects.filter(user=request.user)
        serializer = RecipeSerializer(recipe, many=True)
        return Response(serializer.data)

    def post(self, request):
        request.data['user'] = request.user.id

        serializer = RecipeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MealPlanView(APIView):
    parser_classes = (JSONParser,)

    def get(self, request, year, week):
        recipe = models.MealPlan.objects.filter(user=request.user, year=year, week=week)
        serializer = MealPlanSerializer(recipe, many=True)
        return Response(serializer.data)

class MealPlanPutView(APIView):
    parser_classes = (JSONParser,)

    def put(self, request, year, week, day, meal_type):
        user = request.user.id

        try:
            mp = models.MealPlan.objects.get(user=user, year=year, week=week, day=day)
        except models.MealPlan.DoesNotExist:
            mp = None

        if mp is None:
            data = {'user':user, 'year':year,'week':week,'day':day}
            serializer = MealPlanSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                mp = serializer.instance()
            else:
                return Response(serializer.error, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        recipe = models.Recipe.objects.get(pk=request.data["id"])
        type_update = {meal_type: recipe}
        serializer = MealPlanSerializer(mp, data=type_update, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

