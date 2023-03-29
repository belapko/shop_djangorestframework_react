from django.db import models

from authentication.models import User
from products.models import Product


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cart')
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.pk} {self.user} completed: {self.completed}'

    @property
    def total_price(self):
        products_ins = self.items.all()
        total = sum([item.price for item in products_ins])
        return total

    @property
    def total_quantity(self):
        products_ins = self.items.all()
        total = sum([item.quantity for item in products_ins])
        return total


class CartItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='cartitems')
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    quantity = models.IntegerField(default=0)

    def __str__(self):
        return self.product.title

    @property
    def price(self):
        return self.product.price * self.quantity
