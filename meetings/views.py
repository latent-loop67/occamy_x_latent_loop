from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Meeting
from .serializers import MeetingSerializer
from .services import validate_meeting_data


class MeetingCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            validate_meeting_data(request.data)
        except ValueError as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = MeetingSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MeetingListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        meetings = Meeting.objects.filter(user=request.user)
        serializer = MeetingSerializer(meetings, many=True)
        return Response(serializer.data)
