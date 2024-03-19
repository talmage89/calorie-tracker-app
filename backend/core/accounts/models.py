from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, PermissionsMixin
from django.contrib.auth.hashers import make_password


class CustomUserManager(BaseUserManager):
    def _create_user(self, email, password, is_staff, is_superuser, **kwargs):
        if not email:
            raise ValueError("EmailUser must have an 'email'")
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            is_staff=is_staff,
            is_superuser=is_superuser,
            is_active=True,
            **kwargs
        )
        user.password = make_password(password)
        user.save()

        return user

    def create_user(self, email, password, **kwargs):
        user = self._create_user(email, password, False, False, **kwargs)
        return user
    
    def create_superuser(self, email, password, **kwargs):
        return self._create_user(
            email,
            password,
            True,
            True,
            **kwargs
        )

class CustomUser(AbstractUser, PermissionsMixin):
    username = None
    email = models.EmailField(unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class Profile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, blank=True)
    
    calorie_goal = models.PositiveIntegerField(null=True, blank=True)
    protein_goal = models.PositiveIntegerField(null=True, blank=True)
    carb_goal = models.PositiveIntegerField(null=True, blank=True)
    fat_goal = models.PositiveIntegerField(null=True, blank=True)
    weight = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    weight_goal = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
