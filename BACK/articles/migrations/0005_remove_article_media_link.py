# Generated by Django 5.0.4 on 2024-04-11 22:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0004_alter_article_published_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='article',
            name='media_link',
        ),
    ]
