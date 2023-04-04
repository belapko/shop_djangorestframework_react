import uuid
from django.db.models import Q
from authentication.models import User
from backend import settings
from django.http import HttpResponseRedirect, HttpResponse
from django.views import View
from yookassa import Configuration, Payment
import json
from django.views.decorators.csrf import csrf_exempt
import stripe
from django.http import JsonResponse
from django.core.mail import send_mail

from cart.models import Cart, CartItem
from .models import Order
from .serializers import OrderModelSerializer
from rest_framework.viewsets import ModelViewSet


Configuration.account_id = settings.ya_account_id
Configuration.secret_key = settings.ya_secret_key


class YandexPayment(View):
    def get(self, request, *args, **kwargs):
        payment = Payment.create({
            "amount": {
                "value": kwargs['amount'],
                "currency": "RUB"
            },
            "confirmation": {
                "type": "redirect",
                "return_url": "http://localhost:3000/"
            },
            "capture": True,
            "description": "Заказ №1"
        }, uuid.uuid4())
        return HttpResponseRedirect(payment.confirmation.confirmation_url)


stripe.api_key = settings.STRIPE_SECRET_KEY


@csrf_exempt
def create_payment(request):
    try:
        amount = json.loads(request.body)['amount']
        uid = json.loads(request.body)['uid']
        cart_id = json.loads(request.body)['cartId']
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency='rub',
            automatic_payment_methods={
                'enabled': True,
            },
            metadata={
                'uid': uid,
                'cart_id': cart_id,
            }
        )
        return JsonResponse(data={
            'clientSecret': intent['client_secret']
        })
    except Exception as e:
        return JsonResponse({"error": e})


@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError as e:
        # Invalid payload
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return HttpResponse(status=400)

    if event["type"] == "payment_intent.succeeded":
        user_id = event["data"]["object"]["metadata"]["uid"]
        cart_id = event["data"]["object"]["metadata"]["cart_id"]
        user = User.objects.get(id=user_id)
        cart = Cart.objects.get(id=cart_id)
        email = User.objects.get(id=user_id).email
        order = Order.objects.create(user=user, cart=cart)
        order.save()
        cart = Cart.objects.get(Q(user=user_id) & Q(completed=False))
        cart.completed = True
        cart.save()
        Cart.objects.create(user=user)

        send_mail(
            subject=f"Ваш заказ принят!",
            message=f"Здравстуйте! Ваш заказ на reactrestshop принят, скоро мы начнём его собирать. Подробности"
                    f" заказа можно узнать у нас на сайте.",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[str(email)],
            fail_silently=False,
        )

    return HttpResponse(status=200)


class OrderViewSet(ModelViewSet):
    serializer_class = OrderModelSerializer
    queryset = Order.objects.all()
    pagination_class = None
