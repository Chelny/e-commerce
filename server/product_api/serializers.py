from rest_framework import serializers
from .models import Product, ProductCategory, ProductDiscount, ProductInventory

class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = '__all__'

class ProductDiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDiscount
        fields = '__all__'

class ProductInventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductInventory
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    category = ProductCategorySerializer()
    discount = ProductDiscountSerializer()
    inventory = ProductInventorySerializer()

    class Meta:
        model = Product
        fields = '__all__'