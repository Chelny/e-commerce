from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import permissions
from common.utils import success_response, error_response
from .models import Cart, Order, OrderItems, OrderPayment
from .serializers import CartSerializer, OrderSerializer, OrderItemsSerializer, OrderPaymentSerializer

# Create your views here.
class CartApiView(APIView):
    # Add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.request.method == 'GET' or self.request.method == 'POST' or self.request.method == 'PUT':
            return [permissions.AllowAny()]
        else:
            return super().get_permissions()

    def get_object(self, id):
        try:
            return Cart.objects.get(id=id)
        except Cart.DoesNotExist:
            return None

    def get(self, request, id=None, *args, **kwargs):
        if id is not None:
            # Retrieve a specific cart
            cart = self.get_object(id)
            if not cart:
                return error_response(message='Cart with this ID does not exist', status=status. HTTP_404_NOT_FOUND)
            serializer = CartSerializer(cart)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            # List all carts
            carts = Cart.objects.all()
            serializer = CartSerializer(carts, many=True)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = {
            'session': request.data.get('session'),
            'product': request.data.get('product'),
            'quantity': request.data.get('quantity')
        }
        serializer = CartSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_201_CREATED)

        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        cart = self.get_object(id)
        if not cart:
            return error_response(message='Cart with this ID does not exist', status=status. HTTP_404_NOT_FOUND)
        data = {
            'session': request.data.get('session'),
            'product': request.data.get('product'),
            'quantity': request.data.get('quantity')
        }
        serializer = CartSerializer(instance=cart, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        cart = self.get_object(id)
        if not cart:
            return error_response(message='Cart with this ID does not exist', status=status. HTTP_404_NOT_FOUND)
        cart.delete()
        return error_response(message=None, status=status.HTTP_204_NO_CONTENT)

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
            order = self.get_object(id)
            if not order:
                return error_response(message='Order with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)
            serializer = OrderSerializer(order)
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

        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        order = self.get_object(id)
        if not order:
            return error_response(message='Order with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)
        data = {
            'user': request.data.get('user'),
            'total': request.data.get('total'),
            'payment': request.data.get('payment')
        }
        serializer = OrderSerializer(instance=order, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        order = self.get_object(id)
        if not order:
            return error_response(message='Order with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)
        order.delete()
        return error_response(message=None, status=status.HTTP_204_NO_CONTENT)

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
            order_item = self.get_object(id)
            if not order_item:
                return error_response(message='Order item with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)
            serializer = OrderItemsSerializer(order_item)
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

        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        order_item = self.get_object(id)
        if not order_item:
            return error_response(message='Order item with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)
        data = {
            'order': request.data.get('order'),
            'product': request.data.get('product'),
            'quantity': request.data.get('quantity')
        }
        serializer = OrderItemsSerializer(instance=order_item, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        order_item = self.get_object(id)
        if not order_item:
            return error_response(message='Order item with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)
        order_item.delete()
        return error_response(message=None, status=status.HTTP_204_NO_CONTENT)

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
            order_payment = self.get_object(id)
            if not order_payment:
                return error_response(message='Order payment with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)
            serializer = OrderPaymentSerializer(order_payment)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            # List all order payments
            order_payments = OrderPayment.objects.all()
            serializer = OrderPaymentSerializer(order_payments, many=True)
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

        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        order_payment = self.get_object(id)
        if not order_payment:
            return error_response(message='Order payment with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)
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
        serializer = OrderPaymentSerializer(instance=order_payment, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        order_payment = self.get_object(id)
        if not order_payment:
            return error_response(message='Order payment with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)
        order_payment.delete()
        return error_response(message=None, status=status.HTTP_204_NO_CONTENT)