from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.utils import timezone

from .models import Attendance
from .serializers import AttendanceSerializer


class MarkAttendanceView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        today = timezone.now().date()

        # 🔒 Prevent duplicate attendance
        if Attendance.objects.filter(user=request.user, date=today).exists():
            return Response(
                {"detail": "Attendance already marked for today"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = AttendanceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MyAttendanceView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        attendances = Attendance.objects.filter(user=request.user)
        serializer = AttendanceSerializer(attendances, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
