from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.authentication import SessionAuthentication
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
import json


class LoginAPIView(APIView):
    permission_classes = (permissions.AllowAny)
    authentication_classes = (SessionAuthentication)
    def post(self, request):
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")

        if username is None or password is None:
            return JsonResponse({"detail":"Please provide username and password"}, status=status.HTTP_400_BAD_REQUEST)
        user = authenticate(request, username=username, password=password)
        if user is None:
            return JsonResponse({"detail":"Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
        login(request, user)
        return JsonResponse({"detail": "Successfully logged in!"})
    

class LogoutAPIView(APIView):
    def post(self, request):
        if not request.user.is_authenticated:
            return JsonResponse({"detail":"You are not logged in!"}, status=status.HTTP_400_BAD_REQUEST)
        logout(request)
        return JsonResponse({"detail":"Successfully logged out!"})


class CheckAuthenticationAPIView(APIView):
    def get(self, request):
        print(request.user)
        if request.user.is_authenticated:
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

