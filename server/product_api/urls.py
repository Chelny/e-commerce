from django.urls import path
from .views import (
    ProductApiView,
    ProductCategoryApiView,
    ProductDiscountApiView,
    ProductInventoryApiView,
)

urlpatterns = [
    path('api', ProductApiView.as_view()),
    path('api/<int:id>/', ProductApiView.as_view()),
    path('api/category', ProductCategoryApiView.as_view()),
    path('api/category/<int:id>/', ProductCategoryApiView.as_view()),
    path('api/discount', ProductDiscountApiView.as_view()),
    path('api/discount/<int:id>/', ProductDiscountApiView.as_view()),
    path('api/inventory', ProductInventoryApiView.as_view()),
    path('api/inventory/<int:id>/', ProductInventoryApiView.as_view()),
]