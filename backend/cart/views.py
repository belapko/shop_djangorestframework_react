from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from cart.models import Cart, CartItem
from cart.serializers import CartModelSerializer, CartItemModelSerializer, AddCartItemSerializer
from django.db.models import Q


class CartModelViewSet(ModelViewSet):
    pagination_class = None
    serializer_class = CartModelSerializer
    queryset = Cart.objects.all()
    lookup_field = 'user'

    def retrieve(self, request, *args, **kwargs):
        queryset = Cart.objects.get(Q(user=kwargs['user']) & Q(completed=False))
        serializer = CartModelSerializer(queryset)
        return Response(serializer.data)


class CartItemModelViewSet(ModelViewSet):
    pagination_class = None
    queryset = CartItem.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AddCartItemSerializer
        return CartItemModelSerializer
