from django.db import models
from user_api.models import CustomUser
from product_api.models import Product

# Create your models here.
class Order(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    payment = models.OneToOneField("OrderPayment", on_delete=models.CASCADE, related_name="order_payment")

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.total}"

class OrderItems(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.OneToOneField(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.quantity}"

class OrderPayment(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    amount = models.IntegerField(default=0)
    provider = models.CharField(max_length=20)
    status = models.CharField(max_length=20)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.amount}"