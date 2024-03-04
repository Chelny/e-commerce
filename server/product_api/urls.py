from django.urls import path
from .views import (
    ProductApiView,
    ProductCategoryApiView,
    ProductDiscountApiView,
    ProductInventoryApiView,
    ProductReviewApiView,
    get_product_reviews,
)

urlpatterns = [
    path('', ProductApiView.as_view()),
    path('<int:id>/', ProductApiView.as_view()),
    path('categories/', ProductCategoryApiView.as_view()),
    path('categories/<int:id>/', ProductCategoryApiView.as_view()),
    path('discounts/', ProductDiscountApiView.as_view()),
    path('discounts/<int:id>/', ProductDiscountApiView.as_view()),
    path('inventory/', ProductInventoryApiView.as_view()),
    path('inventory/<int:id>/', ProductInventoryApiView.as_view()),
    path('reviews/', ProductReviewApiView.as_view()),
    path('reviews/<int:id>/', ProductReviewApiView.as_view()),
    path('reviews-by-product-id/<int:product_id>/', get_product_reviews, name='get_product_reviews'),
]