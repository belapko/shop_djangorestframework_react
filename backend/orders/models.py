from django.db import models

from authentication.models import User
from cart.models import Cart


class Order(models.Model):
    STATUS_CHOICES = [
        ('PD', 'Оплачен'),
        ('CG', 'Комплектуется'),
        ('SG', 'В доставке'),
        ('SD', 'Доставлен')
    ]

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    cart = models.ForeignKey(Cart, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    destination = models.CharField(max_length=255, null=True, blank=True)
    status = models.CharField(max_length=2, choices=STATUS_CHOICES, default='PD')
