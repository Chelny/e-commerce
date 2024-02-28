# Generated by Django 5.0.1 on 2024-02-26 16:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product_api', '0006_alter_productdiscount_discount_percent'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productdiscount',
            name='discount_percent',
            field=models.DecimalField(decimal_places=2, default=0.1, max_digits=3),
        ),
    ]