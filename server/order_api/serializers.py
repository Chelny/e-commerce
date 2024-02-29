from rest_framework import serializers
from .models import Order, OrderItems, OrderPayment

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'user', 'total', 'payment', 'created_at', 'updated_at']

class OrderItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItems
        fields = ['id', 'order', 'product', 'quantity', 'created_at', 'updated_at']

class OrderPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderPayment
        fields = ['id', 'order', 'amount', 'provider', 'status', 'created_at', 'updated_at']