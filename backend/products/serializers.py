from rest_framework.serializers import ModelSerializer
from .models import Category, Product


class CategoryModelSerializer(ModelSerializer):
    class Meta:
        fields = ('title',)
        model = Category


class ProductModelSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'category', 'title', 'description', 'price', 'quantity', 'image_url')
