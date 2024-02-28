from django.db import models

class ProductCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    brand = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    description = models.TextField()
    sku = models.CharField(max_length=50, unique=True)
    category = models.ForeignKey(ProductCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name='products')
    colors = models.CharField(max_length=100)  # Semi-colon-separated list of colors
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='images/products/', null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.brand} {self.name} ({self.sku})"

class ProductDiscount(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='discounts', default=None)
    name = models.CharField(max_length=100)
    description = models.TextField()
    discount_percent = models.DecimalField(max_digits=3, decimal_places=2, default=0.10)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class ProductInventory(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='inventories', default=None)
    quantity = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.quantity)