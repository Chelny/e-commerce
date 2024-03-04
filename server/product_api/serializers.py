from rest_framework import serializers
from user_api.serializers import UserSerializer
from .models import Product, ProductCategory, ProductDiscount, ProductInventory, ProductReview

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

class ProductReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = ProductReview
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    category = ProductCategorySerializer()
    discount = ProductDiscountSerializer()
    inventory = ProductInventorySerializer()
    reviews = ProductReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'