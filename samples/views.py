from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Sample
from .serializers import SampleSerializer
from .services import create_sample
from occamy.permissions import IsDistributor, IsAdmin


class CreateSampleView(APIView):
    permission_classes = [IsAuthenticated, IsDistributor]

    def post(self, request):
        serializer = SampleSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        sample = create_sample(
            user=request.user,
            validated_data=serializer.validated_data
        )

        return Response(
            SampleSerializer(sample).data,
            status=status.HTTP_201_CREATED
        )


class SampleReportView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):
        samples = Sample.objects.all().order_by('-date_given')
        serializer = SampleSerializer(samples, many=True)
        return Response(serializer.data)
