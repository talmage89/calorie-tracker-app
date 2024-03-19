from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

from rest_framework import routers, serializers, viewsets
from rest_framework.authtoken import views

from days.api.views import DayViewSet, FoodViewSet, EntryViewSet
from accounts.api.views import UserViewSet, GetAuthToken, ProfileViewSet


router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'profiles', ProfileViewSet)
router.register(r'days', DayViewSet)
router.register(r'foods', FoodViewSet)
router.register(r'entries', EntryViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("api/token-auth/", GetAuthToken.as_view()),
    path('auth/', include('rest_framework.urls', namespace='rest_framework'))
]

# urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]