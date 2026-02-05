from django.urls import path
from .views import DashboardOverviewAPIView, DashboardAttendanceAPIView

urlpatterns = [
    path('overview/', DashboardOverviewAPIView.as_view()),
    path('attendance/', DashboardAttendanceAPIView.as_view()),
]
