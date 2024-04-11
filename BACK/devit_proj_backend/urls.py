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
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from articles.views import CheckAuthenticationView

router = SimpleRouter()

router.register(r'articles', ArticleViewSet, basename='articles')
router.register(r'admin', ArticleAdminViewSet, basename='admin_articles')

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/check-authentication/', CheckAuthenticationView.as_view(), name='check_authentication'),
]

urlpatterns += router.urls