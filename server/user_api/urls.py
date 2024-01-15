from django.urls import path
from .views import (
    UserApiView,
    UserAddressApiView,
    ShoppingSessionApiView,
    CartItemApiView,
    UserPaymentApiView,
)

urlpatterns = [
    path('api', UserApiView.as_view()),
    path('api/<int:id>/', UserApiView.as_view()),
    path('api/addresses', UserAddressApiView.as_view()),
    path('api/addresses/<int:id>/', UserAddressApiView.as_view()),
    path('api/sessions', ShoppingSessionApiView.as_view()),
    path('api/sessions/<int:id>/', ShoppingSessionApiView.as_view()),
    path('api/cart-items', CartItemApiView.as_view()),
    path('api/cart-items/<int:id>/', CartItemApiView.as_view()),
    path('api/payments', UserPaymentApiView.as_view()),
    path('api/payments/<int:id>/', UserPaymentApiView.as_view()),
]