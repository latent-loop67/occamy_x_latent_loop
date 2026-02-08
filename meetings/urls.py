from django.urls import path
from .views import MeetingCreateView, MeetingListView

urlpatterns = [
    path('create/', MeetingCreateView.as_view()),
    path('list/', MeetingListView.as_view()),
]
