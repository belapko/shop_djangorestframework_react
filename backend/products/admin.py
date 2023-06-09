from django.contrib import admin
from .models import Category, Product

admin.site.register(Category)


class ProductAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',)}


admin.site.register(Product, ProductAdmin)
