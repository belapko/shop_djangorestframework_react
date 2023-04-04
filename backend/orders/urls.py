from django.urls import path, include
from .views import YandexPayment, create_payment, stripe_webhook, OrderViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('orders', OrderViewSet)

urlpatterns = [
    path('kassa/<str:amount>/', YandexPayment.as_view()),
    path('create-payment-intent/', create_payment),
    path('stripe-webhook/', stripe_webhook),
    path('', include(router.urls)),
]
