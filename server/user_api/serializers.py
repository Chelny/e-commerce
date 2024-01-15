from rest_framework import serializers
from .models import CustomUser, UserAddress, ShoppingSession, CartItem, UserPayment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["first_name", "last_name", "birth_date", "gender", "email", "password", "active", "created_at", "updated_at"]

class UserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = ["user", "address_line1", "address_line2", "city", "state", "country", "postal_code", "telephone", "mobile", "created_at", "updated_at"]

class ShoppingSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoppingSession
        fields = ["user", "total", "created_at", "updated_at"]

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ["session", "product", "quantity", "updated_at"]

class UserPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPayment
        fields = ["user", "payment_type", "provider", "account_no", "expiry", "created_at", "updated_at"]