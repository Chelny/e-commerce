# Generated by Django 5.0.2 on 2024-03-01 15:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_api', '0007_delete_cartitem'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='gender',
            field=models.CharField(blank=True, choices=[('M', 'Male'), ('F', 'Female'), ('X', 'Other')], max_length=10, null=True),
        ),
    ]
