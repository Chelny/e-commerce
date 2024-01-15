from rest_framework import serializers
from .models import Product, ProductCategory, ProductDiscount, ProductInventory

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["brand", "name", "description", "sku", "colors", "category", "inventory", "price", "discount", "image", "created_at", "updated_at"]

class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ["name", "description", "created_at", "updated_at"]

class ProductDiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDiscount
        fields = ["description", "discount_percent", "active", "created_at", "updated_at"]

class ProductInventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductInventory
        fields = ["quantity", "created_at", "updated_at"]