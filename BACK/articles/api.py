from django.shortcuts import render
from rest_framework.viewsets import ReadOnlyModelViewSet, ModelViewSet
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAdminUser

from .models import Article
from .serializers import ArticleSerializer
from .paginators import ArticlePagination


class ArticleViewSet(ReadOnlyModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    pagination_class = ArticlePagination
    filter_backends = [SearchFilter, OrderingFilter]
    ordering_fields = ['published_date']
    search_fields = ['title', 'description']
    

class ArticleAdminViewSet(ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [SearchFilter, OrderingFilter]
    ordering_fields = ['published_date']
    search_fields = ['title', 'description']