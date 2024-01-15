from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import CustomUser, UserAddress, ShoppingSession, CartItem, UserPayment
from .serializers import UserSerializer, UserAddressSerializer, ShoppingSessionSerializer, CartItemSerializer, UserPaymentSerializer

# Create your views here.
class UserApiView(APIView):
    # Add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, id):
        try:
            return CustomUser.objects.get(id=id)
        except CustomUser.DoesNotExist:
            return None

    def get(self, request, id=None, *args, **kwargs):
        if id is not None:
            # Retrieve a specific user
            user_instance = self.get_object(id)
            if not user_instance:
                return Response(
                    {"res": "Object with user id does not exist"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            serializer = UserSerializer(user_instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # List all users
            users = CustomUser.objects.all()
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

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
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        user_instance = self.get_object(id)
        if not user_instance:
            return Response(
                {"res": "Object with user id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
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
        serializer = UserSerializer(instance=user_instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        user_instance = self.get_object(id)
        if not user_instance:
            return Response(
                {"res": "Object with user id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        user_instance.delete()
        return Response(
            {"res": "Object deleted!"},
            status=status.HTTP_200_OK
        )

class UserAddressApiView(APIView):
    # Add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, id):
        try:
            return UserAddress.objects.get(id=id)
        except UserAddress.DoesNotExist:
            return None

    def get(self, request, id=None, *args, **kwargs):
        if id is not None:
            # Retrieve a specific address
            user_address_instance = self.get_object(id)
            if not user_address_instance:
                return Response(
                    {"res": "Object with user id does not exist"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            serializer = UserAddressSerializer(user_address_instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # List all addresses
            user_addresses = UserAddress.objects.all()
            serializer = UserAddressSerializer(user_addresses, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = {
            'user': request.data.get('user'),
            'address_line1': request.data.get('address_line1'),
            'address_line2': request.data.get('address_line2'),
            'city': request.data.get('city'),
            'state': request.data.get('state'),
            'country': request.data.get('country'),
            'postal_code': request.data.get('postal_code'),
            'telephone': request.data.get('telephone'),
            'mobile': request.data.get('mobile')
        }
        serializer = UserAddressSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        user_address_instance = self.get_object(id)
        if not user_address_instance:
            return Response(
                {"res": "Object with user id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        data = {
            'user': request.data.get('user'),
            'address_line1': request.data.get('address_line1'),
            'address_line2': request.data.get('address_line2'),
            'city': request.data.get('city'),
            'state': request.data.get('state'),
            'country': request.data.get('country'),
            'postal_code': request.data.get('postal_code'),
            'telephone': request.data.get('telephone'),
            'mobile': request.data.get('mobile')
        }
        serializer = UserAddressSerializer(instance=user_address_instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        user_address_instance = self.get_object(id)
        if not user_address_instance:
            return Response(
                {"res": "Object with user id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        user_address_instance.delete()
        return Response(
            {"res": "Object deleted!"},
            status=status.HTTP_200_OK
        )

class ShoppingSessionApiView(APIView):
    # Add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, id):
        try:
            return ShoppingSession.objects.get(id=id)
        except ShoppingSession.DoesNotExist:
            return None

    def get(self, request, id=None, *args, **kwargs):
        if id is not None:
            # Retrieve a specific shopping session
            shopping_session_instance = self.get_object(id)
            if not shopping_session_instance:
                return Response(
                    {"res": "Object with shopping session id does not exist"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            serializer = ShoppingSessionSerializer(shopping_session_instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # List all shopping sessions
            shopping_sessions = ShoppingSession.objects.all()
            serializer = ShoppingSessionSerializer(shopping_sessions, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = {
            'user': request.data.get('user'),
            'total': request.data.get('total')
        }
        serializer = ShoppingSessionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        shopping_session_instance = self.get_object(id)
        if not shopping_session_instance:
            return Response(
                {"res": "Object with shopping session id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        data = {
            'user': request.data.get('user'),
            'total': request.data.get('total')
        }
        serializer = ShoppingSessionSerializer(instance=shopping_session_instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        shopping_session_instance = self.get_object(id)
        if not shopping_session_instance:
            return Response(
                {"res": "Object with shopping session id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        shopping_session_instance.delete()
        return Response(
            {"res": "Object deleted!"},
            status=status.HTTP_200_OK
        )

class CartItemApiView(APIView):
    # Add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, id):
        try:
            return CartItem.objects.get(id=id)
        except CartItem.DoesNotExist:
            return None

    def get(self, request, id=None, *args, **kwargs):
        if id is not None:
            # Retrieve a specific cart item
            cart_item_instance = self.get_object(id)
            if not cart_item_instance:
                return Response(
                    {"res": "Object with cart item id does not exist"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            serializer = CartItemSerializer(cart_item_instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # List all cart items
            cart_items = CartItem.objects.all()
            serializer = CartItemSerializer(cart_items, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = {
            'session': request.data.get('session'),
            'product': request.data.get('product'),
            'quantity': request.data.get('quantity')
        }
        serializer = CartItemSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        cart_item_instance = self.get_object(id)
        if not cart_item_instance:
            return Response(
                {"res": "Object with cart item id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        data = {
            'session': request.data.get('session'),
            'product': request.data.get('product'),
            'quantity': request.data.get('quantity')
        }
        serializer = CartItemSerializer(instance=cart_item_instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        cart_item_instance = self.get_object(id)
        if not cart_item_instance:
            return Response(
                {"res": "Object with cart item id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        cart_item_instance.delete()
        return Response(
            {"res": "Object deleted!"},
            status=status.HTTP_200_OK
        )

class UserPaymentApiView(APIView):
    # Add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, id):
        try:
            return UserPayment.objects.get(id=id)
        except UserPayment.DoesNotExist:
            return None

    def get(self, request, id=None, *args, **kwargs):
        if id is not None:
            # Retrieve a specific payment
            user_payment_instance = self.get_object(id)
            if not user_payment_instance:
                return Response(
                    {"res": "Object with user payment id does not exist"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            serializer = UserPaymentSerializer(user_payment_instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # List all payments
            user_payments = UserPayment.objects.all()
            serializer = UserPaymentSerializer(user_payments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = {
            'user': request.data.get('user'),
            'payment_type': request.data.get('payment_type'),
            'provider': request.data.get('provider'),
            'account_no': request.data.get('account_no'),
            'expiry': request.data.get('expiry')
        }
        serializer = UserPaymentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        user_payment_instance = self.get_object(id)
        if not user_payment_instance:
            return Response(
                {"res": "Object with user payment id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        data = {
            'user': request.data.get('user'),
            'payment_type': request.data.get('payment_type'),
            'provider': request.data.get('provider'),
            'account_no': request.data.get('account_no'),
            'expiry': request.data.get('expiry')
        }
        serializer = UserPaymentSerializer(instance=user_payment_instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        user_payment_instance = self.get_object(id)
        if not user_payment_instance:
            return Response(
                {"res": "Object with user payment id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        user_payment_instance.delete()
        return Response(
            {"res": "Object deleted!"},
            status=status.HTTP_200_OK
        )
