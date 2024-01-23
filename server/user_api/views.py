from django.shortcuts import render
from django.contrib.auth.hashers import make_password, check_password
from rest_framework import status
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from common.utils import success_response, error_response
from .models import CustomUser, UserAddress, ShoppingSession, CartItem, UserPayment
from .serializers import LoginSerializer, UserSerializer, UserAddressSerializer, ShoppingSessionSerializer, CartItemSerializer, UserPaymentSerializer

# Create your views here.
class UserLoginView(APIView):
    def get_user_by_email(self, email):
        try:
            user = CustomUser.objects.get(email=email)
            return user
        except CustomUser.DoesNotExist:
            return None

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            user = self.get_user_by_email(email)

            if user is not None and check_password(password, user.password):
                # Generate JWT tokens
                refresh = RefreshToken.for_user(user)
                tokens = {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
                return success_response(data=tokens, status_code=status.HTTP_200_OK)

            return error_response(message='Invalid credentials', status_code=status.HTTP_401_UNAUTHORIZED)

        return error_response(message='Invalid data', status_code=status.HTTP_400_BAD_REQUEST)

class UserApiView(APIView):
    # authentication_classes = [JWTAuthentication]

    # Add permission to check if user is authenticated
    # permission_classes = [permissions.IsAuthenticated]

    permission_classes_by_action = {
        'get': [permissions.IsAuthenticated],
        'post': [],
        'put': [JWTAuthentication, permissions.IsAuthenticated],
        'delete': [JWTAuthentication, permissions.IsAuthenticated],
    }

    def get_permissions(self):
        return [permission() for permission in self.permission_classes_by_action.get(self.action, [])]

    def initial(self, request, *args, **kwargs):
        self.action = None
        super().initial(request, *args, **kwargs)

    def get_object(self, id):
        try:
            return CustomUser.objects.get(id=id)
        except CustomUser.DoesNotExist:
            return None

    def get(self, request, id=None, *args, **kwargs):
        self.action = 'get'

        if id is not None:
            # Retrieve a specific user
            user_instance = self.get_object(id)
            if not user_instance:
                return error_response(message='User with this ID does not exist', status_code=status.HTTP_400_BAD_REQUEST)
            serializer = UserSerializer(user_instance)
            return success_response(data=serializer.data, status_code=status.HTTP_200_OK)
        else:
            # List all users
            users = CustomUser.objects.all()
            serializer = UserSerializer(users, many=True)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        self.action = 'post'

        print(request.data)

        data = {
            'first_name': request.data.get('firstName'),
            'last_name': request.data.get('lastName'),
            'gender': request.data.get('gender'),
            'birth_date': request.data.get('birthDate'),
            'email': request.data.get('email'),
            'password': make_password(request.data.get('password'))
        }

        # Set active state to True
        data['active'] = True

        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()

            # Create a token for the user using refresh token
            refresh = RefreshToken.for_user(serializer.instance)
            tokens = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }

            return success_response(data={'user': serializer.data, 'tokens': tokens}, status_code=status.HTTP_201_CREATED)

        return error_response(message=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        self.action = 'put'

        user_instance = self.get_object(id)
        if not user_instance:
            return error_response(message='User with this ID does not exist', status_code=status.HTTP_400_BAD_REQUEST)
        data = {
            'first_name': request.data.get('firstName'),
            'last_name': request.data.get('lastName'),
            'gender': request.data.get('gender'),
            'birth_date': request.data.get('birthDate'),
            'email': request.data.get('email')
        }

        # Check if a new password is provided
        password = request.data.get('password')
        if password is not None:
            data['password'] = make_password(password)

        serializer = UserSerializer(instance=user_instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        return error_response(message=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        self.action = 'delete'

        user_instance = self.get_object(id)
        if not user_instance:
            return error_response(message='User with this ID does not exist', status_code=status.HTTP_400_BAD_REQUEST)
        user_instance.delete()
        return error_response(message=None, status_code=status.HTTP_204_NO_CONTENT)

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
                return error_response(message='Address with this ID does not exist', status_code=status.HTTP_400_BAD_REQUEST)
            serializer = UserAddressSerializer(user_address_instance)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            # List all addresses
            user_addresses = UserAddress.objects.all()
            serializer = UserAddressSerializer(user_addresses, many=True)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)

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
            return success_response(data=serializer.data, status=status.HTTP_201_CREATED)

        return error_response(message=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        user_address_instance = self.get_object(id)
        if not user_address_instance:
            return error_response(message='Address with this ID does not exist', status_code=status.HTTP_400_BAD_REQUEST)
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
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        return error_response(message=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        user_address_instance = self.get_object(id)
        if not user_address_instance:
            return error_response(message='Address with this ID does not exist', status_code=status.HTTP_400_BAD_REQUEST)
        user_address_instance.delete()
        return error_response(message=None, status_code=status.HTTP_204_NO_CONTENT)

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
                return error_response(message='Shopping session with this ID does not exist', status_code=status.HTTP_400_BAD_REQUEST)
            serializer = ShoppingSessionSerializer(shopping_session_instance)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            # List all shopping sessions
            shopping_sessions = ShoppingSession.objects.all()
            serializer = ShoppingSessionSerializer(shopping_sessions, many=True)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = {
            'user': request.data.get('user'),
            'total': request.data.get('total')
        }
        serializer = ShoppingSessionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_201_CREATED)

        return error_response(message=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        shopping_session_instance = self.get_object(id)
        if not shopping_session_instance:
            return error_response(message='Shopping session with this ID does not exist', status_code=status.HTTP_400_BAD_REQUEST)
        data = {
            'user': request.data.get('user'),
            'total': request.data.get('total')
        }
        serializer = ShoppingSessionSerializer(instance=shopping_session_instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        return error_response(message=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        shopping_session_instance = self.get_object(id)
        if not shopping_session_instance:
            return error_response(message='Shopping session with this ID does not exist', status_code=status.HTTP_400_BAD_REQUEST)
        shopping_session_instance.delete()
        return error_response(message=None, status_code=status.HTTP_204_NO_CONTENT)

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
                return error_response(message='Cart item with this ID does not exist', status_code=status.HTTP_400_BAD_REQUEST)
            serializer = CartItemSerializer(cart_item_instance)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            # List all cart items
            cart_items = CartItem.objects.all()
            serializer = CartItemSerializer(cart_items, many=True)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = {
            'session': request.data.get('session'),
            'product': request.data.get('product'),
            'quantity': request.data.get('quantity')
        }
        serializer = CartItemSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_201_CREATED)

        return error_response(message=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        cart_item_instance = self.get_object(id)
        if not cart_item_instance:
            return error_response(message='Cart item with this ID does not exist', status_code=status.HTTP_400_BAD_REQUEST)
        data = {
            'session': request.data.get('session'),
            'product': request.data.get('product'),
            'quantity': request.data.get('quantity')
        }
        serializer = CartItemSerializer(instance=cart_item_instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        return error_response(message=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        cart_item_instance = self.get_object(id)
        if not cart_item_instance:
            return error_response(message='Cart item with this ID does not exist', status_code=status.HTTP_400_BAD_REQUEST)
        cart_item_instance.delete()
        return error_response(message=None, status_code=status.HTTP_204_NO_CONTENT)

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
                return error_response(message='User payment with this ID does not exist', status_code=status.HTTP_400_BAD_REQUEST)
            serializer = UserPaymentSerializer(user_payment_instance)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            # List all payments
            user_payments = UserPayment.objects.all()
            serializer = UserPaymentSerializer(user_payments, many=True)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)

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
            return success_response(data=serializer.data, status=status.HTTP_201_CREATED)

        return error_response(message=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        user_payment_instance = self.get_object(id)
        if not user_payment_instance:
            return error_response(message='User payment with this ID does not exist', status_code=status.HTTP_400_BAD_REQUEST)
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
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        return error_response(message=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        user_payment_instance = self.get_object(id)
        if not user_payment_instance:
            return error_response(message='User payment with this ID does not exist', status_code=status.HTTP_400_BAD_REQUEST)
        user_payment_instance.delete()
        return error_response(message=None, status_code=status.HTTP_204_NO_CONTENT)
