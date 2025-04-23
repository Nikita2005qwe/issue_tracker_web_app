from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated
from settings_app.models import UserSettings
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
    