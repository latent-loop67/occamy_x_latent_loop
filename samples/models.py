from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL


class Sample(models.Model):
    PURPOSE_CHOICES = (
        ('TRIAL', 'Trial'),
        ('DEMO', 'Demo'),
        ('FOLLOW_UP', 'Follow Up'),
    )

    given_by = models.ForeignKey(User, on_delete=models.CASCADE)
    receiver_name = models.CharField(max_length=255)
    receiver_category = models.CharField(
        max_length=50,
        choices=(
            ('FARMER', 'Farmer'),
            ('SELLER', 'Seller'),
            ('INFLUENCER', 'Influencer'),
        )
    )
    quantity = models.PositiveIntegerField()
    purpose = models.CharField(max_length=20, choices=PURPOSE_CHOICES)
    date_given = models.DateField(auto_now_add=True)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.receiver_name} - {self.quantity}"
