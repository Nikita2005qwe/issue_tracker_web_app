from django.contrib import admin
from utils.URLPatternBuilder import URLPatternBuilder
from .services import SettingsAppContext


app_name = 'settings_app'

urlpatterns = URLPatternBuilder.get_urls_patterns(app_name)
