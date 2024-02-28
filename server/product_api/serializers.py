from rest_framework import serializers
from .models import Product, ProductCategory, ProductDiscount, ProductInventory

class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ["name", "description", "created_at", "updated_at"]

class ProductDiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDiscount
        fields = ["product", "name", "description", "discount_percent", "active", "created_at", "updated_at"]

class ProductInventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductInventory
        fields = ["product", "quantity", "created_at", "updated_at"]

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["brand", "name", "description", "sku", "category", "colors", "price", "image", "created_at", "updated_at"]