from django.contrib import admin
from .models import Product, ProductCategory, ProductInventory, ProductDiscount

# Register your models here.
admin.site.register(Product)
admin.site.register(ProductCategory)
admin.site.register(ProductInventory)
admin.site.register(ProductDiscount)
