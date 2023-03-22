from django.db import models


class Category(models.Model):
    title = models.CharField(max_length=100, db_index=True)

    class Meta:
        verbose_name_plural = 'Categories'


class Product(models.Model):
    category = models.ForeignKey(Category, related_name='products', on_delete=models.SET_NULL, null=True, blank=True)
    title = models.CharField(max_length=100, db_index=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    image_url = models.ImageField(upload_to='products_images')
