from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()

class Food(models.Model):
    name = models.CharField(max_length=255)
    calories = models.DecimalField(max_digits=6, decimal_places=2)
    protein = models.DecimalField(max_digits=6, decimal_places=2)
    carbs = models.DecimalField(max_digits=6, decimal_places=2)
    fat = models.DecimalField(max_digits=6, decimal_places=2)

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Day(models.Model):
    date = models.DateField()

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.date.strftime("%Y-%m-%d")

class Entry(models.Model):
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    day = models.ForeignKey(Day, on_delete=models.CASCADE, related_name='entries')
    quantity = models.DecimalField(max_digits=6, decimal_places=2)

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.quantity} {self.food.name} on {self.day.date.strftime('%Y-%m-%d')}"