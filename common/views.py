import re
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .models import EmailOTP
from .services import generate_otp

class SendOTPAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")

        if not email:
            return Response({"error": "Email required"}, status=400)

        EmailOTP.objects.filter(email=email).delete()

        otp = generate_otp()
        EmailOTP.objects.create(email=email, otp=otp)

        print("========== OTP GENERATED ==========")
        print("EMAIL:", email)
        print("OTP  :", otp)
        print("=================================")

        return Response(
            {"message": "OTP generated (check terminal)"},
            status=200
        )


class VerifyOTPAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        otp = request.data.get("otp")

        try:
            record = EmailOTP.objects.filter(
                email=email,
                otp=otp,
                is_verified=False
            ).latest("created_at")
        except EmailOTP.DoesNotExist:
            return Response({"error": "Invalid OTP"}, status=400)

        if record.is_expired():
            return Response({"error": "OTP expired"}, status=400)

        record.is_verified = True
        record.save()

        return Response({"message": "OTP verified"}, status=200)
