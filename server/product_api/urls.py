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
    path('category/', ProductCategoryApiView.as_view()),
    path('category/<int:id>/', ProductCategoryApiView.as_view()),
    path('discount/', ProductDiscountApiView.as_view()),
    path('discount/<int:id>/', ProductDiscountApiView.as_view()),
    path('inventory/', ProductInventoryApiView.as_view()),
    path('inventory/<int:id>/', ProductInventoryApiView.as_view()),
]