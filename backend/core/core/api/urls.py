from rest_framework.routers import DefaultRouter
from days.api.urls import days_router
from django.urls import path, include

router = DefaultRouter()
router.registry.extend(days_router.registry)

urlpatterns = [
    path('', include(router.urls)),
]