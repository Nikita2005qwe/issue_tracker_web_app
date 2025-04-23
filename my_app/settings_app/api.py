from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import UserSettings
from .serializers import UserSettingsSerializer
from permissions.IsOwner import IsOwner
from utils.DataBaseObjectsProcessing import DataBaseObjectsProcessing


class UserSettingsViewSet(viewsets.ModelViewSet):
    permission_classes = [
        IsAuthenticated,
        IsOwner,
        permissions.AllowAny
    ]
    serializer_class = UserSettingsSerializer
    
    def get_queryset(self):
        return DataBaseObjectsProcessing.get_objects_owned_by_user(UserSettings, self.request.user)

    def partial_update(self, request, *args, **kwargs):
        # Переопределяем метод для частичного обновления
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
