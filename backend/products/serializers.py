from django.utils.text import slugify
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Category, Product


class CategoryModelSerializer(ModelSerializer):
    class Meta:
        fields = ('pk', 'title',)
        model = Category


class ProductModelSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = ('pk', 'category', 'title', 'description', 'price', 'quantity', 'image_url', 'slug')


class CartProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = ['pk', 'title', 'price', 'image_url', 'slug']
