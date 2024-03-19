from django.contrib.auth import get_user_model
from rest_framework import serializers

from ..models import Profile


User = get_user_model()

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        exclude = ('created_at',)


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        exclude = ('password', 'is_superuser', 'is_staff', 'is_active', 'date_joined', 'user_permissions', 'groups')
        required_fields = ('email', 'password')


class UserCreateSerializer(serializers.Serializer):
    email = serializers.EmailField(write_only=True)

    password = serializers.CharField(
        label="Password", 
        style={"input_type": "password"}, 
        trim_whitespace=False,
        write_only=True
    )

    is_active = serializers.BooleanField(required=False)

    is_staff = serializers.BooleanField(required=False)
    
    def validate(self, data):
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError("Email already exists")
        return data