from django.urls import path
from django.contrib import admin
from rest_framework import routers
from .api import TaskViewSet, TaskSectionViewSet
from .views import IndexView


app_name = 'issue_tracker'

router = routers.DefaultRouter()
router.register('api/task', TaskViewSet, "task")
router.register('api/section', TaskSectionViewSet, "section")

urlpatterns = [
    path("main", IndexView.as_view(), name="main"),
]

urlpatterns += router.urls
