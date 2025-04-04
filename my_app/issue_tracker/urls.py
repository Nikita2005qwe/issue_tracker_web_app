from django.contrib import admin
from utils.URLPatternBuilder import URLPatternBuilder
from .services import IssueTrackerContext


app_name = 'issue_tracker'

urlpatterns = URLPatternBuilder.get_urls_patterns(app_name)
