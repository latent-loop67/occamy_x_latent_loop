from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class Attendance(models.Model):
    STATUS_CHOICES = (
        ('PRESENT', 'Present'),
        ('ABSENT', 'Absent'),
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='attendances'
    )
    date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    marked_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'date')
        ordering = ['-date']

    def __str__(self):
        return f"{self.user} - {self.date} - {self.status}"
