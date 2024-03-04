from django.contrib import admin
from .models import CustomUser, ResetPasswordToken, UserAddress, ShoppingSession, UserPayment

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(ResetPasswordToken)
admin.site.register(UserAddress)
admin.site.register(ShoppingSession)
admin.site.register(UserPayment)
