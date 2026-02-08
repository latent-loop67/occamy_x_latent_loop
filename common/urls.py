from django.urls import path
from .views import SendOTPAPIView, VerifyOTPAPIView

urlpatterns = [
    path("send-otp/", SendOTPAPIView.as_view()),
    path("verify-otp/", VerifyOTPAPIView.as_view()),
]
