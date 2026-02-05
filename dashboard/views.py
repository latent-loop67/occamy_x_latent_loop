from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .services import (
    get_user_stats,
    get_today_attendance_stats,
    get_user_wise_attendance
)


class DashboardOverviewAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "users": get_user_stats(),
            "today_attendance": get_today_attendance_stats(),
        })


class DashboardAttendanceAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "attendance_summary": get_user_wise_attendance()
        })