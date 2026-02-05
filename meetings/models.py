from django.db import models
from django.conf import settings

class Meeting(models.Model):
    MEETING_TYPE_CHOICES = (
        ('ONE_TO_ONE', 'One to One'),
        ('GROUP', 'Group'),
    )

    CATEGORY_CHOICES = (
        ('FARMER', 'Farmer'),
        ('SELLER', 'Seller'),
        ('INFLUENCER', 'Influencer'),
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    meeting_type = models.CharField(
        max_length=20,
        choices=MEETING_TYPE_CHOICES
    )

    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        blank=True,
        null=True
    )

    person_name = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    village = models.CharField(max_length=100)

    attendees_count = models.PositiveIntegerField(
        blank=True,
        null=True
    )

    business_potential = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    latitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        blank=True,
        null=True
    )

    longitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        blank=True,
        null=True
    )

    photo = models.ImageField(
        upload_to='meetings/',
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.meeting_type} - {self.village}"
