from django.urls import path
from .views import MarkAttendanceView, MyAttendanceView

urlpatterns = [
    path('mark/', MarkAttendanceView.as_view(), name='mark-attendance'),
    path('my/', MyAttendanceView.as_view(), name='my-attendance'),
]
