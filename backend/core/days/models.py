from django.db import models


class Day(models.Model):
    date = models.DateField()
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.date.strftime("%Y-%m-%d")


class Food(models.Model):
    name = models.CharField(max_length=255)
    protein = models.IntegerField()
    carbs = models.IntegerField()
    fat = models.IntegerField()

    day = models.ManyToManyField(Day)
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name