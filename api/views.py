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

@require_POST
def login_view(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    if username is None or password is None:
        return JsonResponse({'detail': 'Please provide username and passowrd.'}, status=400)

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

@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'isAuthenticated': True})

class IngredientView(APIView):
    parser_classes = (JSONParser,)

    def post(self, request, *args, **kwargs):
        serializer = IngredientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RecipeViewDetailed(APIView):
    parser_classes = (MultiPartParser,)

    def get(self, request, name):
        recipe = models.Recipe.objects.filter(user=request.user, name=name)
        serializer = RecipeSerializer(recipe, many=True)
        return Response(serializer.data)

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

    def post(self, request, year, week):
        request.data['user'] = request.user.id

        serializer = MealPlanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

