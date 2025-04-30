from django import forms
from .models import Task, TaskSection


class TaskForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ['title', 'is_important', 'section_id']
        widgets = {
            'deadline_date': forms.DateInput(attrs={'type': 'date'}),
            'deadline_time': forms.TimeInput(attrs={'type': 'time'}),
        }
    
    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)  # Извлекаем объект request
        super().__init__(*args, **kwargs)
    
    def save(self, commit=True):
        instance = super().save(commit=False)
        instance.user = self.request.user  # Используем текущего пользователя
        if commit:
            instance.save()
        return instance


class SectionForm(forms.ModelForm):
    class Meta:
        model = TaskSection
        fields = ['title']
    
    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        super().__init__(*args, **kwargs)
    
    def save(self, commit=True):
        instance = super().save(commit=False)
        instance.user = self.request.user
        if commit:
            instance.save()
        return instance
    