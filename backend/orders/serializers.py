from .models import Order
from rest_framework.serializers import ModelSerializer


class OrderModelSerializer(ModelSerializer):
    class Meta:
        model = Order
        fields = ('pk', 'user', 'cart', 'created_at', 'updated_at', 'destination', 'status')
