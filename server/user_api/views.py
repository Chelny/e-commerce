from django.shortcuts import render
from django.contrib.auth.hashers import make_password, check_password
from django.utils.crypto import get_random_string
from django.utils import timezone
from datetime import timedelta
from django.core.mail import send_mail
from django.utils.translation import gettext_lazy as _
from rest_framework import status
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from common.utils import success_response, error_response
from .models import CustomUser, ResetPasswordToken, UserAddress, ShoppingSession, CartItem, UserPayment
from .serializers import UserSerializer, LoginSerializer, ForgotPasswordSerializer, ResetPasswordSerializer, UserAddressSerializer, ShoppingSessionSerializer, CartItemSerializer, UserPaymentSerializer

# Create your views here.
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
                return error_response(message='User with this ID does not exist', status=status. HTTP_404_NOT_FOUND)
            serializer = UserSerializer(user_instance)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            # List all users
            users = CustomUser.objects.all()
            serializer = UserSerializer(users, many=True)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        self.action = 'post'
        print(request.data)
        data = {
            'first_name': request.data.get('first_name'),
            'last_name': request.data.get('last_name'),
            'gender': request.data.get('gender'),
            'birth_date': request.data.get('birth_date'),
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

            return success_response(data={'user': serializer.data, 'tokens': tokens}, status=status.HTTP_201_CREATED)

        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        self.action = 'put'

        user_instance = self.get_object(id)
        if not user_instance:
            return error_response(message='User with this ID does not exist', status=status. HTTP_404_NOT_FOUND)

        data = {
            'first_name': request.data.get('first_name'),
            'last_name': request.data.get('last_name'),
            'gender': request.data.get('gender'),
            'birth_date': request.data.get('birth_date'),
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
        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        self.action = 'delete'

        user_instance = self.get_object(id)
        if not user_instance:
            return error_response(message='User with this ID does not exist', status=status. HTTP_404_NOT_FOUND)
        user_instance.delete()
        return error_response(message=None, status=status.HTTP_204_NO_CONTENT)

class UserLoginApiView(APIView):
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
                    'access_token': str(refresh.access_token),
                    'refresh_token': str(refresh),
                }
                return success_response(data=tokens, status=status.HTTP_200_OK)

            return error_response(errors=serializer.errors, message=_('The email or the password is invalid.'), status=status.HTTP_401_UNAUTHORIZED)

        return error_response(errors=serializer.errors, message=_('Something went wrong. Verify your data and submit again.'), status=status.HTTP_400_BAD_REQUEST)

class UserForgotPasswordApiView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ForgotPasswordSerializer(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data['email']

            try:
                user = CustomUser.objects.get(email=email)
            except CustomUser.DoesNotExist:
                return error_response(errors=serializer.errors, message=_('The account does not exist.'), status=status.HTTP_404_NOT_FOUND)

            # Generate a unique token
            token = get_random_string(length=32)

            # Set the token, the email, and expiry time in the user model
            reset_token = ResetPasswordToken.objects.create(
                user=user,
                token=token,
                expires_at=timezone.now() + timedelta(minutes=20)
            )

            reset_password_link = f'http://localhost:3000/fr-CA/reset-password?token={token}'

            email_message = _("Hello %(name)s,\n\nWe've received a request to reset the password for the account associated with the email %(email)s.\n\nYou can reset your password by copy-paste the following URL in a browser: %(reset_password_link)s.\n\nIf you did not request a new password, please let us know immediately by replying to this email.\n\n-- E-Commerce Team") % { 'name': user.first_name, 'email': user.email, 'reset_password_link': reset_password_link }

            send_mail(
                _('Password Reset'),
                email_message,
                'support@ecommerce.dev',
                [user.email],
                fail_silently=False,
            )

            return success_response(message=_('A reset password link has been sent to %(email)s.') % {'email': user.email}, status=status.HTTP_200_OK)

        return error_response(errors=serializer.errors, message=_('Something went wrong. Verify your data and submit again.'), status=status.HTTP_400_BAD_REQUEST)

class UserResetPasswordApiView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ResetPasswordSerializer(data=request.data)

        if serializer.is_valid():
            token = serializer.validated_data['token']
            password = serializer.validated_data['password']

            # Set a default value for reset_token
            reset_token = None

            # Find the reset token
            try:
                reset_token = ResetPasswordToken.objects.get(token=token, expires_at__gt=timezone.now())
            except ResetPasswordToken.DoesNotExist:
                return error_response(message=_('The token is invalid or expired.'), status=status.HTTP_404_NOT_FOUND)

            # Reset the user's password
            user = reset_token.user
            user.password = make_password(password)
            user.save()

            # Delete the used reset token
            reset_token.delete()

            return success_response(message=_('The password has been reset successfully!'), status=status.HTTP_200_OK)

        return error_response(errors=serializer.errors, message=_('Something went wrong. Verify your data and submit again.'), status=status.HTTP_400_BAD_REQUEST)

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
                return error_response(message='Address with this ID does not exist', status=status. HTTP_404_NOT_FOUND)
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

        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        user_address_instance = self.get_object(id)
        if not user_address_instance:
            return error_response(message='Address with this ID does not exist', status=status. HTTP_404_NOT_FOUND)
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
        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        user_address_instance = self.get_object(id)
        if not user_address_instance:
            return error_response(message='Address with this ID does not exist', status=status. HTTP_404_NOT_FOUND)
        user_address_instance.delete()
        return error_response(message=None, status=status.HTTP_204_NO_CONTENT)

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
                return error_response(message='Shopping session with this ID does not exist', status=status. HTTP_404_NOT_FOUND)
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

        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        shopping_session_instance = self.get_object(id)
        if not shopping_session_instance:
            return error_response(message='Shopping session with this ID does not exist', status=status. HTTP_404_NOT_FOUND)
        data = {
            'user': request.data.get('user'),
            'total': request.data.get('total')
        }
        serializer = ShoppingSessionSerializer(instance=shopping_session_instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        shopping_session_instance = self.get_object(id)
        if not shopping_session_instance:
            return error_response(message='Shopping session with this ID does not exist', status=status. HTTP_404_NOT_FOUND)
        shopping_session_instance.delete()
        return error_response(message=None, status=status.HTTP_204_NO_CONTENT)

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
                return error_response(message='Cart item with this ID does not exist', status=status. HTTP_404_NOT_FOUND)
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

        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        cart_item_instance = self.get_object(id)
        if not cart_item_instance:
            return error_response(message='Cart item with this ID does not exist', status=status. HTTP_404_NOT_FOUND)
        data = {
            'session': request.data.get('session'),
            'product': request.data.get('product'),
            'quantity': request.data.get('quantity')
        }
        serializer = CartItemSerializer(instance=cart_item_instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        cart_item_instance = self.get_object(id)
        if not cart_item_instance:
            return error_response(message='Cart item with this ID does not exist', status=status. HTTP_404_NOT_FOUND)
        cart_item_instance.delete()
        return error_response(message=None, status=status.HTTP_204_NO_CONTENT)

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
                return error_response(message='User payment with this ID does not exist', status=status. HTTP_404_NOT_FOUND)
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

        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        user_payment_instance = self.get_object(id)
        if not user_payment_instance:
            return error_response(message='User payment with this ID does not exist', status=status. HTTP_404_NOT_FOUND)
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
        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        user_payment_instance = self.get_object(id)
        if not user_payment_instance:
            return error_response(message='User payment with this ID does not exist', status=status. HTTP_404_NOT_FOUND)
        user_payment_instance.delete()
        return error_response(message=None, status=status.HTTP_204_NO_CONTENT)
