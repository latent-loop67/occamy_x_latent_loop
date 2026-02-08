from django.urls import path
from .views import SignupAPIView, LoginView

urlpatterns = [
    path('signup/', SignupAPIView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
]
