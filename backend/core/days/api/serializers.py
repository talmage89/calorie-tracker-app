from rest_framework import serializers
from ..models import Day, Food


class DaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Day
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at', 'user')

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at', 'day', 'user')