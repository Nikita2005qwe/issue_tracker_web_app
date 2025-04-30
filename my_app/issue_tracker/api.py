from .models import Task, TaskSection
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import TaskSerializer, TaskSectionSerializer
from utils.DataBaseObjectsProcessing import DataBaseObjectsProcessing
from permissions.IsOwner import IsOwner


class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = [
        IsAuthenticated,
        IsOwner,
        AllowAny
    ]
    serializer_class = TaskSerializer
    
    def get_queryset(self):
        return DataBaseObjectsProcessing.get_objects_owned_by_user(Task, self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TaskSectionViewSet(viewsets.ModelViewSet):
    permission_classes = [
        IsAuthenticated,
        IsOwner,
        AllowAny
    ]
    serializer_class = TaskSectionSerializer
    
    def get_queryset(self):
        return DataBaseObjectsProcessing.get_objects_owned_by_user(TaskSection, self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        