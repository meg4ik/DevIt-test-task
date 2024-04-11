# Generated by Django 5.0.4 on 2024-04-11 22:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0002_article_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='description',
            field=models.TextField(blank=True, null=True, verbose_name='Description'),
        ),
        migrations.AlterField(
            model_name='article',
            name='link',
            field=models.URLField(blank=True, null=True, verbose_name='Resource link'),
        ),
        migrations.AlterField(
            model_name='article',
            name='media_link',
            field=models.URLField(blank=True, null=True, verbose_name='Picture link'),
        ),
        migrations.AlterField(
            model_name='article',
            name='published_date',
            field=models.DateTimeField(blank=True, null=True, verbose_name='Date of publishing'),
        ),
    ]