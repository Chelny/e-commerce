from django.urls import path
from .views import (
    UserApiView,
    UserLoginApiView,
    UserForgotPasswordApiView,
    UserResetPasswordApiView,
    UserAddressApiView,
    ShoppingSessionApiView,
    CartItemApiView,
    UserPaymentApiView,
)

urlpatterns = [
    path('', UserApiView.as_view(), name='user'),
    path('<int:id>/', UserApiView.as_view()),
    path('login/', UserLoginApiView.as_view()),
    path('forgot-password/', UserForgotPasswordApiView.as_view()),
    path('reset-password/', UserResetPasswordApiView.as_view()),
    path('addresses/', UserAddressApiView.as_view()),
    path('addresses/<int:id>/', UserAddressApiView.as_view()),
    path('sessions/', ShoppingSessionApiView.as_view()),
    path('sessions/<int:id>/', ShoppingSessionApiView.as_view()),
    path('cart-items/', CartItemApiView.as_view()),
    path('cart-items/<int:id>/', CartItemApiView.as_view()),
    path('payments/', UserPaymentApiView.as_view()),
    path('payments/<int:id>/', UserPaymentApiView.as_view()),
]