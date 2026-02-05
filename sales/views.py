from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import Product, Sale
from .serializers import ProductSerializer, SaleSerializer
from .services import create_sale
from occamy.permissions import IsDistributor, IsAdmin


class ProductListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class CreateSaleView(APIView):
    permission_classes = [IsAuthenticated, IsDistributor]

    def post(self, request):
        serializer = SaleSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        sale = create_sale(
            user=request.user,
            validated_data=serializer.validated_data
        )

        return Response(
            SaleSerializer(sale).data,
            status=status.HTTP_201_CREATED
        )


class SalesReportView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):
        sales = Sale.objects.all()
        serializer = SaleSerializer(sales, many=True)
        return Response(serializer.data)
