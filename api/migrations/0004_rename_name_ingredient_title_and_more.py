# Generated by Django 4.2.3 on 2023-11-30 10:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_recipe_description_recipe_unique_recipe_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='ingredient',
            old_name='name',
            new_name='title',
        ),
        migrations.RenameField(
            model_name='recipe',
            old_name='image',
            new_name='imagePath',
        ),
        migrations.RenameField(
            model_name='recipe',
            old_name='name',
            new_name='title',
        ),
    ]