from django.urls import path
from .views import (
    OrderApiView,
    OrderItemsApiView,
    OrderPaymentApiView,
)

urlpatterns = [
    path('api', OrderApiView.as_view()),
    path('api/<int:id>/', OrderApiView.as_view()),
    path('api/items', OrderItemsApiView.as_view()),
    path('api/items/<int:id>/', OrderItemsApiView.as_view()),
    path('api/payments', OrderPaymentApiView.as_view()),
    path('api/payments/<int:id>/', OrderPaymentApiView.as_view()),
]