from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from cart.models import Cart, CartItem
from products.serializers import CartProductSerializer


class CartItemModelSerializer(ModelSerializer):
    product = CartProductSerializer()

    class Meta:
        model = CartItem
        fields = ('pk', 'product', 'cart', 'quantity', 'price')

    def create(self, validated_data):
        print(validated_data)


class CartModelSerializer(ModelSerializer):
    items = CartItemModelSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ('pk', 'user', 'completed', 'total_price', 'total_quantity', 'items')


class AddCartItemSerializer(ModelSerializer):

    def save(self, **kwargs):
        cart_pk = self.validated_data["cart"].pk
        product_pk = self.validated_data["product"].pk
        quantity = self.validated_data["quantity"]
        try:
            cartitem = CartItem.objects.get(product=product_pk, cart=cart_pk)
            cartitem.quantity += quantity
            cartitem.save()
            self.instance = cartitem
        except:
            self.instance = CartItem.objects.create(**self.validated_data)
        return self.instance

    class Meta:
        model = CartItem
        fields = ('pk', 'cart', 'product', 'quantity')
