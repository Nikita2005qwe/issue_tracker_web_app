from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class TaskSection(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    
    def __str__(self):
        return f"{self.title} для пользователя {self.user}"
    
    class Meta:
        verbose_name = 'Секция'
        verbose_name_plural = 'Секции'


class Task(models.Model):
    # Поля задачи
    title = models.CharField(max_length=200, verbose_name='Название задачи')
    is_completed = models.BooleanField(default=False, verbose_name='Отметка о выполнении')
    is_important = models.BooleanField(default=False, verbose_name='Отметка о внесении задачи в раздел важных')
    section_id = models.ForeignKey(TaskSection, on_delete=models.CASCADE)
    
    # Связь с пользователем
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks', verbose_name='Пользователь')
    
    def __str__(self):
        return f"Задача {self.title} для пользователя {self.user}"
    
    class Meta:
        verbose_name = 'Задача'
        verbose_name_plural = 'Задачи'
