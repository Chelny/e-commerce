from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import permissions
from common.utils import success_response, error_response
from .models import Order, OrderItems, OrderPayment
from .serializers import OrderSerializer, OrderItemsSerializer, OrderPaymentSerializer

# Create your views here.
class OrderApiView(APIView):
    # Add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, id):
        try:
            return Order.objects.get(id=id)
        except Order.DoesNotExist:
            return None

    def get(self, request, id=None, *args, **kwargs):
        if id is not None:
            # Retrieve a specific order
            order_instance = self.get_object(id)
            if not order_instance:
                return error_response(message='Order with this ID does not exist', status_code=status.HTTP_400_BAD_REQUEST)
            serializer = OrderSerializer(order_instance)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            # List all orders
            orders = Order.objects.all()
            serializer = OrderSerializer(orders, many=True)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = {
            'user': request.data.get('user'),
            'total': request.data.get('total'),
            'payment': request.data.get('payment')
        }
        serializer = OrderSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_201_CREATED)

        return error_response(message=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        order_instance = self.get_object(id)
        if not order_instance:
            return error_response(message='Order with this ID does not exist', status_code=status.HTTP_400_BAD_REQUEST)
        data = {
            'user': request.data.get('user'),
            'total': request.data.get('total'),
            'payment': request.data.get('payment')
        }
        serializer = OrderSerializer(instance=order_instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        return error_response(message=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        order_instance = self.get_object(id)
        if not order_instance:
            return error_response(message='Order with this ID does not exist', status_code=status.HTTP_400_BAD_REQUEST)
        order_instance.delete()
        return error_response(message=None, status_code=status.HTTP_204_NO_CONTENT)

class OrderItemsApiView(APIView):
    # Add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, id):
        try:
            return OrderItems.objects.get(id=id)
        except OrderItems.DoesNotExist:
            return None

    def get(self, request, id=None, *args, **kwargs):
        if id is not None:
            # Retrieve a specific order item
            order_item_instance = self.get_object(id)
            if not order_item_instance:
                return error_response(message='Order item with this ID does not exist', status_code=status.HTTP_400_BAD_REQUEST)
            serializer = OrderItemsSerializer(order_item_instance)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            # List all order items
            order_items = OrderItems.objects.all()
            serializer = OrderItemsSerializer(order_items, many=True)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = {
            'order': request.data.get('order'),
            'product': request.data.get('product'),
            'quantity': request.data.get('quantity')
        }
        serializer = OrderItemsSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_201_CREATED)

        return error_response(message=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        order_item_instance = self.get_object(id)
        if not order_item_instance:
            return error_response(message='Order item with this ID does not exist', status_code=status.HTTP_400_BAD_REQUEST)
        data = {
            'order': request.data.get('order'),
            'product': request.data.get('product'),
            'quantity': request.data.get('quantity')
        }
        serializer = OrderItemsSerializer(instance=order_item_instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        return error_response(message=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        order_item_instance = self.get_object(id)
        if not order_item_instance:
            return error_response(message='Order item with this ID does not exist', status_code=status.HTTP_400_BAD_REQUEST)
        order_item_instance.delete()
        return error_response(message=None, status_code=status.HTTP_204_NO_CONTENT)

class OrderPaymentApiView(APIView):
    # Add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, id):
        try:
            return OrderPayment.objects.get(id=id)
        except OrderPayment.DoesNotExist:
            return None

    def get(self, request, id=None, *args, **kwargs):
        if id is not None:
            # Retrieve a specific payment detail
            order_payment_instance = self.get_object(id)
            if not order_payment_instance:
                return error_response(message='Order payment with this ID does not exist', status_code=status.HTTP_400_BAD_REQUEST)
            serializer = OrderPaymentSerializer(order_payment_instance)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            # List all order payments
            order_payment = OrderPayment.objects.all()
            serializer = OrderPaymentSerializer(order_payment, many=True)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = {
            'brand': request.data.get('brand'),
            'name': request.data.get('name'),
            'description': request.data.get('description'),
            'sku': request.data.get('sku'),
            'colors': request.data.get('colors'),
            'category_id': request.data.get('category_id'),
            'inventory_id': request.data.get('inventory_id'),
            'price': request.data.get('price'),
            'discount_id': request.data.get('discount_id'),
            'image': request.data.get('image')
        }
        serializer = OrderPaymentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_201_CREATED)

        return error_response(message=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        order_payment_instance = self.get_object(id)
        if not order_payment_instance:
            return error_response(message='Order payment with this ID does not exist', status_code=status.HTTP_400_BAD_REQUEST)
        data = {
            'brand': request.data.get('brand'),
            'name': request.data.get('name'),
            'description': request.data.get('description'),
            'sku': request.data.get('sku'),
            'colors': request.data.get('colors'),
            'category_id': request.data.get('category_id'),
            'inventory_id': request.data.get('inventory_id'),
            'price': request.data.get('price'),
            'discount_id': request.data.get('discount_id'),
            'image': request.data.get('image')
        }
        serializer = OrderPaymentSerializer(instance=order_payment_instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        return error_response(message=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        order_payment_instance = self.get_object(id)
        if not order_payment_instance:
            return error_response(message='Order payment with this ID does not exist', status_code=status.HTTP_400_BAD_REQUEST)
        order_payment_instance.delete()
        return error_response(message=None, status_code=status.HTTP_204_NO_CONTENT)