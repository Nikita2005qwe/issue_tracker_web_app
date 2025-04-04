from django import forms
from issue_tracker.models import Task, TaskSection


class TaskForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ['title', 'is_important', 'section_id']
        
    
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
        fields = ['title']  # Только одно поле для названия секции
    
    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)  # Извлекаем объект request
        super().__init__(*args, **kwargs)
    
    def save(self, commit=True):
        instance = super().save(commit=False)
        instance.user = self.request.user  # Используем текущего пользователя
        if commit:
            instance.save()
        return instance