from django.urls import path
from django.contrib import admin
from rest_framework import routers
from utils.URLPatternBuilder import URLPatternBuilder
from .services import IssueTrackerContext
from .api import TaskViewSet


app_name = 'issue_tracker'

router = routers.DefaultRouter()
router.register('api/task', TaskViewSet, "task")

urlpatterns = URLPatternBuilder.get_urls_patterns(app_name)
urlpatterns += router.urls
