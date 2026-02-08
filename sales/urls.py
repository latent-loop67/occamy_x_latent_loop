from django.urls import path
from .views import ProductListView, CreateSaleView, SalesReportView

urlpatterns = [
    path('products/', ProductListView.as_view()),
    path('create/', CreateSaleView.as_view()),
    path('report/', SalesReportView.as_view()),
]
