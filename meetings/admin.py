from django.contrib import admin
from .models import Meeting


@admin.register(Meeting)
class MeetingAdmin(admin.ModelAdmin):
    list_display = ('meeting_type', 'village', 'user', 'created_at')
    list_filter = ('meeting_type', 'category')
    search_fields = ('village', 'person_name')


# Register your models here.
