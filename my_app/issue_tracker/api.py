from .models import Task
from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated
from .serializers import TaskSerializer
from utils.DataBaseObjectsProcessing import DataBaseObjectsProcessing
from permissions.IsOwner import IsOwner


class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = [
        IsAuthenticated,
        IsOwner,
        permissions.AllowAny
    ]
    serializer_class = TaskSerializer
    
    def get_queryset(self):
        return DataBaseObjectsProcessing.get_objects_owned_by_user(Task, self.request.user)
    