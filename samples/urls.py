from django.urls import path
from .views import CreateSampleView, SampleReportView

urlpatterns = [
    path('create/', CreateSampleView.as_view()),
    path('report/', SampleReportView.as_view()),
]
