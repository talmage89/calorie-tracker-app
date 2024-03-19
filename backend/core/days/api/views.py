from django.utils import timezone

from rest_framework import permissions, status
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .serializers import DaySerializer, FoodSerializer, EntrySerializer
from ..models import Day, Food, Entry


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
        if (Day.objects.filter(user=self.request.user, date=timezone.now().date()).exists()):
            raise PermissionDenied(detail="Day already exists")
        
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'], url_path='today', url_name='today')
    def get_today(self, request):
        latest = None
        
        try:
            latest = Day.objects.filter(user=request.user).latest('date')
        except Day.DoesNotExist:
            pass

        if (not latest or latest.date != timezone.now().date()):
            latest = Day.objects.create(user=request.user, date=timezone.now().date())

        serializer = self.get_serializer(latest)
        return Response(serializer.data, status=status.HTTP_200_OK)


class FoodViewSet(ModelViewSet):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer
    permission_classes = (IsAuthenticated, IsOwner)

    def get_queryset(self):
        return Food.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class EntryViewSet(ModelViewSet):
    queryset = Entry.objects.all()
    serializer_class = EntrySerializer
    permission_classes = (IsAuthenticated, IsOwner)

    def get_queryset(self):
        return Entry.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        print(serializer.validated_data)

        serializer.save(user=self.request.user)
