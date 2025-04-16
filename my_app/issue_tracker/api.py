from .models import Task
from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated, BasePermission
from .serializers import TaskSerializer
from utils.DataBaseObjectsProcessing import DataBaseObjectsProcessing


class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


class TaskViewSet(viewsets.ModelViewSet):
    queryset = DataBaseObjectsProcessing.get_all_objects(Task)
    permission_classes = [
        IsAuthenticated,
        IsOwner,
        permissions.AllowAny
    ]
    serializer_class = TaskSerializer
    
    def get_queryset(self):
        return DataBaseObjectsProcessing.get_objects_owned_by_user(Task, self.request.user)
    