from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from ..models import Day, Food
from .serializers import DaySerializer, FoodSerializer

from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


class DayViewSet(ModelViewSet):
    queryset = Day.objects.all()
    serializer_class = DaySerializer
    permission_classes = (IsAuthenticated, IsOwner)

    def get_queryset(self):
        return Day.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



class FoodViewSet(ModelViewSet):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer
    permission_classes = (IsAuthenticated, IsOwner)

    def get_queryset(self):
        return Food.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)