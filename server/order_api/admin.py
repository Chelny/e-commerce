from django.contrib import admin
from .models import Cart, Order, OrderItems, OrderPayment

# Register your models here.
admin.site.register(Cart)
admin.site.register(Order)
admin.site.register(OrderItems)
admin.site.register(OrderPayment)
