from django.urls import path
from django.contrib import admin
from rest_framework import routers
from .api import TaskViewSet
from .views import IndexView


app_name = 'issue_tracker'

router = routers.DefaultRouter()
router.register('api/task', TaskViewSet, "task")

urlpatterns = [
    path("main", IndexView.as_view(), name="main"),
]

urlpatterns += router.urls
