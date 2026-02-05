from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('ADMIN', 'Admin'),
        ('DISTRIBUTOR', 'Distributor'),
    )
    role = models.CharField(
    max_length=20,
    choices=ROLE_CHOICES,
    null=True,
    blank=True
)
    phone = models.CharField(max_length=15, blank=True, null=True)
    preferred_language = models.CharField(
        max_length=10,
        choices=(('en', 'English'), ('hi', 'Hindi')),
        default='en'
    )

    def __str__(self):
        return f"{self.username} ({self.role})"
