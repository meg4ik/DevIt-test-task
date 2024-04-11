from rest_framework import serializers
from .models import Article
from django.core.exceptions import ValidationError

from django.contrib.auth import get_user_model, authenticate


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'

