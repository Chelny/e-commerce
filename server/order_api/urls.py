from django.urls import path
from .views import (
    CartApiView,
    OrderApiView,
    OrderItemsApiView,
    OrderPaymentApiView,
)

urlpatterns = [
    path('', OrderApiView.as_view()),
    path('<int:id>/', OrderApiView.as_view()),
    path('carts/', CartApiView.as_view()),
    path('carts/<int:id>/', CartApiView.as_view()),
    path('items/', OrderItemsApiView.as_view()),
    path('items/<int:id>/', OrderItemsApiView.as_view()),
    path('payments/', OrderPaymentApiView.as_view()),
    path('payments/<int:id>/', OrderPaymentApiView.as_view()),
]