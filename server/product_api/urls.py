from django.urls import path
from .views import (
    ProductApiView,
    ProductCategoryApiView,
    ProductDiscountApiView,
    ProductInventoryApiView,
)

urlpatterns = [
    path('', ProductApiView.as_view()),
    path('<int:id>/', ProductApiView.as_view()),
    path('categories/', ProductCategoryApiView.as_view()),
    path('categories/<int:id>/', ProductCategoryApiView.as_view()),
    path('discounts/', ProductDiscountApiView.as_view()),
    path('discounts/<int:id>/', ProductDiscountApiView.as_view()),
    path('inventories/', ProductInventoryApiView.as_view()),
    path('inventories/<int:id>/', ProductInventoryApiView.as_view()),
]