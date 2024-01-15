from django.db import models

# Create your models here.
class ProductCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name}"

class ProductDiscount(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    discount_percent = models.DecimalField(max_digits=5, decimal_places=2, default=0)  # Example: 15.75 for 15.75%
    active = models.BooleanField(default=True)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name}"

class ProductInventory(models.Model):
    quantity = models.IntegerField(default=0)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.quantity}"

class Product(models.Model):
    brand = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    description = models.TextField()
    sku = models.CharField(max_length=50, unique=True)
    colors = models.CharField(max_length=100)  # Assuming a comma-separated list of colors
    category = models.ForeignKey(ProductCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name='products')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.ForeignKey(ProductDiscount, on_delete=models.SET_NULL, null=True, blank=True, related_name='products')
    inventory = models.OneToOneField(ProductInventory, on_delete=models.CASCADE, null=True, blank=True, related_name='product')
    image = models.ImageField(upload_to='images/products/')

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.brand} {self.name} ({self.sku})"