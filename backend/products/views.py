from rest_framework.viewsets import ModelViewSet
from .serializers import CategoryModelSerializer, ProductModelSerializer
from .models import Category, Product


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategoryModelSerializer


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductModelSerializer
