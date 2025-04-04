from django import forms
from .models import UserSettings

class SettingsForm(forms.ModelForm):
    class Meta:
        model = UserSettings
        fields = ['warn_on_task_delete']
        labels = {
            'warn_on_task_delete': 'Уведомлять при удалении задачи',
        }