from django.shortcuts import render
from django.contrib import messages
from .models import Task
from settings_app.models import UserSettings
from django.views.generic.base import View
from django.http import JsonResponse

    