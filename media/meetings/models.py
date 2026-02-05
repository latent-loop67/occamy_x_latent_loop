from django.db import models
from django.conf import settings

class Meeting(models.Model):
    title = models.CharField(max_length=255)
    photo = models.ImageField(
        upload_to='meetings/',
        blank=True,
        null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
