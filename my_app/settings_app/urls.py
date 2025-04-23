from django.urls import path
from django.contrib import admin
from rest_framework import routers
from settings_app.services import SettingsAppContext
from settings_app.views import SettingsAppPage
from .api import UserSettingsViewSet


app_name = 'settings_app'

router = routers.DefaultRouter()
router.register('api/update-setting', UserSettingsViewSet, "update-setting")

urlpatterns = [
    path('', SettingsAppPage.as_view(), name='main_settings_app'),
]
urlpatterns += router.urls
