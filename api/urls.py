from django.urls import path

from . import views

urlpatterns = [
    path('register/', views.register_view, name='api-register'),
    path('login/', views.login_view, name='api-login'),
    path('logout/', views.logout_view, name='api-logout'),
    path('ingredient/', views.IngredientView.as_view(), name='api-ingredient'),
    path('recipe/', views.RecipeView.as_view(), name='api-recipe'),
    path('recipe/<str:name>/', views.RecipeViewDetailed.as_view(), name='api-get-recipe-detail'),
    path('mealplan/<int:year>/<int:week>/', views.MealPlanView.as_view(), name='api-get-mealplan'),
    path('mealplan/', views.MealPlanView.as_view(), name='api-post-mealplan'),
    path('session/', views.session_view, name='api-session'),
]
