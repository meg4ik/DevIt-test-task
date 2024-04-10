"""
URL configuration for devit_proj_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""


from rest_framework.routers import SimpleRouter
from django.urls import path

from articles.api import ArticleViewSet, ArticleAdminViewSet
from articles.views import login_view, logout_view, session_view

router = SimpleRouter()

router.register(r'articles', ArticleViewSet, basename='articles')
router.register(r'admin', ArticleAdminViewSet, basename='admin_articles')

urlpatterns = [
    path('login/', login_view, name='api-login'),
    path('logout/', logout_view, name='api-logout'),
    path('session/', session_view, name='api-session'),
]

urlpatterns += router.urls