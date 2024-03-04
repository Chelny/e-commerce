from django.shortcuts import render
from django.db.models import Prefetch
from django.db.models import Avg, Count, Sum
from django.http import JsonResponse
from django.http import Http404
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import permissions
from common.utils import success_response, error_response
from .models import Product, ProductCategory, ProductDiscount, ProductInventory, ProductReview
from .serializers import ProductSerializer, ProductCategorySerializer, ProductDiscountSerializer, ProductInventorySerializer, ProductReviewSerializer

# Create your views here.
class ProductApiView(APIView):
    # Add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        else:
            return super().get_permissions()

    def get_object(self, id):
        try:
            return Product.objects.get(id=id)
        except Product.DoesNotExist:
            return None

    def get(self, request, id=None, *args, **kwargs):
        filter_param = request.query_params.get('filter', None)
        page_param = request.query_params.get('page', 1)
        per_page = 20

        if id is not None:
            # Retrieve a specific product
            product = self.get_object(id)

            if not product:
                return error_response(message='Product with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)

            serializer = ProductSerializer(product)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            # List all products (with filtering)
            if filter_param == 'popular': # FIXME: Logic
                products_queryset = Product.objects.annotate(total_orders=Sum('orders__quantity')).order_by('-total_orders')
            elif filter_param == 'sales':
                products_queryset = Product.objects.filter(discount__active=True)
            else:
                products_queryset = Product.objects.all().order_by('-created_at')

            reviews_prefetch = Prefetch('reviews', queryset=ProductReview.objects.all())
            products_queryset = products_queryset.prefetch_related(reviews_prefetch)

            paginator = Paginator(products_queryset, per_page)

            try:
                products_page = paginator.page(page_param)
            except PageNotAnInteger:
                products_page = paginator.page(1)
            except EmptyPage:
                raise Http404('No more pages available')

            serializer_page = ProductSerializer(products_page, many=True)

            # Return the paginated response
            data = {
                'products': serializer_page.data,
                'total_count': len(serializer_page.data),
                'total_pages': paginator.num_pages,
                'current_page': products_page.number,
            }

            return success_response(data=data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = {
            'brand': request.data.get('brand'),
            'name': request.data.get('name'),
            'description': request.data.get('description'),
            'sku': request.data.get('sku'),
            'category_id': request.data.get('category_id'),
            'colors': request.data.get('colors'),
            'price': request.data.get('price'),
            'image': request.data.get('image')
        }

        serializer = ProductSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_201_CREATED)

        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        product = self.get_object(id)

        if not product:
            return error_response(message='Product with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)

        data = {
            'brand': request.data.get('brand'),
            'name': request.data.get('name'),
            'description': request.data.get('description'),
            'sku': request.data.get('sku'),
            'category_id': request.data.get('category_id'),
            'colors': request.data.get('colors'),
            'price': request.data.get('price'),
            'image': request.data.get('image')
        }

        serializer = ProductSerializer(instance=product, data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_200_OK)

        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        product = self.get_object(id)

        if not product:
            return error_response(message='Product with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)

        product.delete()
        return error_response(message=None, status=status.HTTP_204_NO_CONTENT)

class ProductCategoryApiView(APIView):
    # Add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        else:
            return super().get_permissions()

    def get_object(self, id):
        try:
            return ProductCategory.objects.get(id=id)
        except ProductCategory.DoesNotExist:
            return None

    def get(self, request, id=None, *args, **kwargs):
        if id is not None:
            # Retrieve a specific product category
            product_category = self.get_object(id)

            if not product_category:
                return error_response(message='Product category with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)

            serializer = ProductCategorySerializer(product_category)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            # List all product categories
            product_categories = ProductCategory.objects.all()
            serializer = ProductCategorySerializer(product_categories, many=True)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = {
            'name': request.data.get('name'),
            'description': request.data.get('description')
        }

        serializer = ProductCategorySerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_201_CREATED)

        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        product_category = self.get_object(id)

        if not product_category:
            return error_response(message='Product category with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)

        data = {
            'name': request.data.get('name'),
            'description': request.data.get('description')
        }

        serializer = ProductCategorySerializer(instance=product_category, data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_200_OK)

        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        product_category = self.get_object(id)

        if not product_category:
            return error_response(message='Product category with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)

        product_category.delete()
        return error_response(message=None, status=status.HTTP_204_NO_CONTENT)

class ProductDiscountApiView(APIView):
    # Add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        else:
            return super().get_permissions()

    def get_object(self, id):
        try:
            return ProductDiscount.objects.get(id=id)
        except ProductDiscount.DoesNotExist:
            return None

    def get(self, request, id=None, *args, **kwargs):
        if id is not None:
            # Retrieve a specific product discount
            product_discount = self.get_object(id)

            if not product_discount:
                return error_response(message='Product discount with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)

            serializer = ProductDiscountSerializer(product_discount)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            # List all product discounts
            product_discounts = ProductDiscount.objects.all()
            serializer = ProductDiscountSerializer(product_discounts, many=True)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = {
            'product': request.data.get('product'),
            'name': request.data.get('name'),
            'description': request.data.get('description'),
            'discount_percent': request.data.get('discount_percent'),
            'active': request.data.get('active')
        }

        serializer = ProductDiscountSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_201_CREATED)

        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        product_discount = self.get_object(id)

        if not product_discount:
            return error_response(message='Product discount with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)

        data = {
            'product': request.data.get('product'),
            'name': request.data.get('name'),
            'description': request.data.get('description'),
            'discount_percent': request.data.get('discount_percent'),
            'active': request.data.get('active')
        }

        serializer = ProductDiscountSerializer(instance=product_discount, data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_200_OK)

        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        product_discount = self.get_object(id)

        if not product_discount:
            return error_response(message='Product discount with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)

        product_discount.delete()
        return error_response(message=None, status=status.HTTP_204_NO_CONTENT)

class ProductInventoryApiView(APIView):
    # Add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        else:
            return super().get_permissions()

    def get_object(self, id):
        try:
            return ProductInventory.objects.get(id=id)
        except ProductInventory.DoesNotExist:
            return None

    def get(self, request, id=None, *args, **kwargs):
        if id is not None:
            # Retrieve a specific product inventory
            product_inventory = self.get_object(id)

            if not product_inventory:
                return error_response(message='Product inventory with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)

            serializer = ProductInventorySerializer(product_inventory)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            # List all product inventories
            product_inventories = ProductInventory.objects.all()
            serializer = ProductInventorySerializer(product_inventories, many=True)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = {
            'product': request.data.get('product'),
            'quantity': request.data.get('quantity')
        }

        serializer = ProductInventorySerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_201_CREATED)

        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        product_inventory = self.get_object(id)

        if not product_inventory:
            return error_response(message='Product inventory with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)

        data = {
            'product': request.data.get('product'),
            'quantity': request.data.get('quantity')
        }

        serializer = ProductInventorySerializer(instance=product_inventory, data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_200_OK)

        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        product_inventory = self.get_object(id)

        if not product_inventory:
            return error_response(message='Product inventory with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)

        product_inventory.delete()
        return error_response(message=None, status=status.HTTP_204_NO_CONTENT)

class ProductReviewApiView(APIView):
    # Add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.request.method == 'GET' or self.request.method == 'POST' or self.request.method == 'PUT':
            return [permissions.AllowAny()]
        else:
            return super().get_permissions()

    def get_object(self, id):
        try:
            return ProductReview.objects.get(id=id)
        except ProductReview.DoesNotExist:
            return None

    def get(self, request, id=None, *args, **kwargs):
        if id is not None:
            # Retrieve a specific product review
            product_review = self.get_object(id)

            if not product_review:
                return error_response(message='Product review with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)

            serializer = ProductReviewSerializer(product_review)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            # List all product reviews
            product_reviews = ProductReview.objects.all()
            serializer = ProductReviewSerializer(product_reviews, many=True)
            return success_response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = {
            'user': request.data.get('user'),
            'product': request.data.get('product'),
            'rating': request.data.get('rating'),
            'title': request.data.get('title'),
            'comment': request.data.get('comment')
        }

        serializer = ProductReviewSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_201_CREATED)

        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        product_review = self.get_object(id)

        if not product_review:
            return error_response(message='Product review with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)

        data = {
            'user': request.data.get('user'),
            'product': request.data.get('product'),
            'rating': request.data.get('rating'),
            'title': request.data.get('title'),
            'comment': request.data.get('comment')
        }

        serializer = ProductReviewSerializer(instance=product_review, data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, status=status.HTTP_200_OK)

        return error_response(errors=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        product_review = self.get_object(id)

        if not product_review:
            return error_response(message='Product review with this ID does not exist', status=status.HTTP_400_BAD_REQUEST)

        product_review.delete()
        return error_response(message=None, status=status.HTTP_204_NO_CONTENT)

def get_product_reviews(request, product_id):
    product = Product.objects.get(pk=product_id)

    reviews_data = product.reviews.aggregate(
        total_reviews=Count('id'),
        average_rating=Avg('rating')
    )

    total_reviews = reviews_data.get('total_reviews') or 0
    average_rating = reviews_data.get('average_rating') or 0

    # Get the count of reviews for each star rating
    star_ratings_count = product.reviews.values('rating').annotate(count=Count('rating'))
    star_ratings = {rating['rating']: rating['count'] for rating in star_ratings_count}

    response_data = {
        'total_reviews': total_reviews,
        'average_rating': average_rating,
        'star_ratings': star_ratings # Count for each star rating
    }

    return JsonResponse(response_data)