# Generated by Django 5.0.2 on 2024-03-01 15:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user_api', '0006_alter_cartitem_id_alter_customuser_id_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='CartItem',
        ),
    ]
