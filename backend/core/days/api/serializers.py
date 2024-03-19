from rest_framework import serializers

from ..models import Day, Food, Entry


class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at', 'day', 'user')


class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entry
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at', 'user')

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['food'] = FoodSerializer(instance.food).data
        return data


class DaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Day
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at', 'user')

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['entries'] = EntrySerializer(instance.entries, many=True).data
        return data