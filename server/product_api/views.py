from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import permissions
from common.utils import success_response, error_response
from .models import Product, ProductCategory, ProductDiscount, ProductInventory
from .serializers import ProductSerializer, ProductCategorySerializer, ProductDiscountSerializer, ProductInventorySerializer

# Create your views here.
class ProductApiView(APIView):
    # Add permission to check if user is authenticated
    # permission_classes = [permissions.IsAuthenticated]

    def get_object(self, id):
        try:
            return Product.objects.get(id=id)
        except Product.DoesNotExist:
            return None

    def get(self, request, id=None, *args, **kwargs):
        if id is not None:
            # Retrieve a specific product
            product_instance = self.get_object(id)
            if not product_instance:
                return error_response(message='Product with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)
            serializer = ProductSerializer(product_instance)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            # List all products
            products = Product.objects.all().select_related('category', 'discount', 'inventory')
            serializer = ProductSerializer(products, many=True)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = {
            'brand': request.data.get('brand'),
            'name': request.data.get('name'),
            'description': request.data.get('description'),
            'sku': request.data.get('sku'),
            'category_id': request.data.get('category_id'),
            'colors': request.data.get('colors'),
            'price': request.data.get('price'),
            'image': request.data.get('image')
        }
        serializer = ProductSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_201_CREATED)

        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        product_instance = self.get_object(id)
        if not product_instance:
            return error_response(message='Product with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)
        data = {
            'brand': request.data.get('brand'),
            'name': request.data.get('name'),
            'description': request.data.get('description'),
            'sku': request.data.get('sku'),
            'category_id': request.data.get('category_id'),
            'colors': request.data.get('colors'),
            'price': request.data.get('price'),
            'image': request.data.get('image')
        }
        serializer = ProductSerializer(instance=product_instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        product_instance = self.get_object(id)
        if not product_instance:
            return error_response(message='Product with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)
        product_instance.delete()
        return error_response(message=None, status=status.HTTP_204_NO_CONTENT)

class ProductCategoryApiView(APIView):
    # Add permission to check if user is authenticated
    # permission_classes = [permissions.IsAuthenticated]

    def get_object(self, id):
        try:
            return ProductCategory.objects.get(id=id)
        except ProductCategory.DoesNotExist:
            return None

    def get(self, request, id=None, *args, **kwargs):
        if id is not None:
            # Retrieve a specific category
            product_category_instance = self.get_object(id)
            if not product_category_instance:
                return error_response(message='Category with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)

            serializer = ProductCategorySerializer(product_category_instance)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            # List all product categories
            products = ProductCategory.objects.all()
            serializer = ProductCategorySerializer(products, many=True)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = {
            'name': request.data.get('name'),
            'description': request.data.get('description')
        }
        serializer = ProductCategorySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_201_CREATED)

        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        product_category_instance = self.get_object(id)
        if not product_category_instance:
            return error_response(message='Category with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)
        data = {
            'name': request.data.get('name'),
            'description': request.data.get('description')
        }
        serializer = ProductCategorySerializer(instance=product_category_instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        product_category_instance = self.get_object(id)
        if not product_category_instance:
            return error_response(message='Category with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)
        product_category_instance.delete()
        return error_response(message=None, status=status.HTTP_204_NO_CONTENT)

class ProductDiscountApiView(APIView):
    # Add permission to check if user is authenticated
    # permission_classes = [permissions.IsAuthenticated]

    def get_object(self, id):
        try:
            return ProductDiscount.objects.get(id=id)
        except ProductDiscount.DoesNotExist:
            return None

    def get(self, request, id=None, *args, **kwargs):
        if id is not None:
            # Retrieve a specific discount
            product_discount_instance = self.get_object(id)
            if not product_discount_instance:
                return error_response(message='Product discount with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)

            serializer = ProductDiscountSerializer(product_discount_instance)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            # List all discounts
            products = ProductDiscount.objects.all()
            serializer = ProductDiscountSerializer(products, many=True)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = {
            'product': request.data.get('product'),
            'name': request.data.get('name'),
            'description': request.data.get('description'),
            'discount_percent': request.data.get('discount_percent'),
            'active': request.data.get('active')
        }
        serializer = ProductDiscountSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_201_CREATED)

        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        product_discount_instance = self.get_object(id)
        if not product_discount_instance:
            return error_response(message='Product discount with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)
        data = {
            'product': request.data.get('product'),
            'name': request.data.get('name'),
            'description': request.data.get('description'),
            'discount_percent': request.data.get('discount_percent'),
            'active': request.data.get('active')
        }
        serializer = ProductDiscountSerializer(instance=product_discount_instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        product_discount_instance = self.get_object(id)
        if not product_discount_instance:
            return error_response(message='Product discount with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)
        product_discount_instance.delete()
        return error_response(message=None, status=status.HTTP_204_NO_CONTENT)

class ProductInventoryApiView(APIView):
    # Add permission to check if user is authenticated
    # permission_classes = [permissions.IsAuthenticated]

    def get_object(self, id):
        try:
            return ProductInventory.objects.get(id=id)
        except ProductInventory.DoesNotExist:
            return None

    def get(self, request, id=None, *args, **kwargs):
        if id is not None:
            # Retrieve a specific inventory
            product_inventory_instance = self.get_object(id)
            if not product_inventory_instance:
                return error_response(message='Inventory with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)

            serializer = ProductInventorySerializer(product_inventory_instance)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            # List all inventories
            products = ProductInventory.objects.all()
            serializer = ProductInventorySerializer(products, many=True)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = {
            'product': request.data.get('product'),
            'quantity': request.data.get('quantity')
        }
        serializer = ProductInventorySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_201_CREATED)

        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        product_inventory_instance = self.get_object(id)
        if not product_inventory_instance:
            return error_response(message='Inventory with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)
        data = {
            'product': request.data.get('product'),
            'quantity': request.data.get('quantity')
        }
        serializer = ProductInventorySerializer(instance=product_inventory_instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        product_inventory_instance = self.get_object(id)
        if not product_inventory_instance:
            return error_response(message='Inventory with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)
        product_inventory_instance.delete()
        return error_response(message=None, status=status.HTTP_204_NO_CONTENT)