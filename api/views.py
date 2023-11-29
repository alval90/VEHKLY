import json

from django import forms
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST

from api import models

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

class IngredientForm(forms.ModelForm):
    class Meta:
        model = models.Ingredient
        exclude = []

class RecipeForm(forms.ModelForm):
    class Meta:
        model = models.Recipe
        exclude = []

@require_POST
def upload_ingredient(request):
    request.POST
@require_POST
def upload_recipe(request):


