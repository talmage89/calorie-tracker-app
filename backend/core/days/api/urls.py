from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import DayViewSet, FoodViewSet

days_router = DefaultRouter()

days_router.register('days', DayViewSet)
days_router.register('foods', FoodViewSet)