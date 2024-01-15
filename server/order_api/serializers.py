from rest_framework import serializers
from .models import Order, OrderItems, OrderPayment

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ["user", "total", "payment", "created_at", "updated_at"]

class OrderItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItems
        fields = ["order", "product", "quantity", "created_at", "updated_at"]

class OrderPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderPayment
        fields = ["order", "amount", "provider", "status", "created_at", "updated_at"]