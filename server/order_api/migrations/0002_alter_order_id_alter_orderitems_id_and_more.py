# Generated by Django 5.0.2 on 2024-02-29 00:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order_api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='orderitems',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='orderpayment',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
