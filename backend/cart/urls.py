from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CartModelViewSet, CartItemModelViewSet

router = DefaultRouter()
router.register('cart', CartModelViewSet, basename='cart')
router.register('cartitem', CartItemModelViewSet, basename='cartitem')

urlpatterns = [
    path('', include(router.urls)),
]
