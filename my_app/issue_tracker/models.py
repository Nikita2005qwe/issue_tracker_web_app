from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import datetime


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

    # Временные поля
    time_created = models.DateTimeField(auto_now_add=True, verbose_name='Время создания')
    deadline_date = models.DateField(blank=True, null=True, verbose_name='Крайний срок выполнения задачи')
    deadline_time = models.TimeField(blank=True, null=True, verbose_name='Крайнее время выполнения задачи')

    # Связь с пользователем
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks', verbose_name='Пользователь')

    def get_deadline(self):
        """Возвращает полную дату и время крайнего срока."""
        if self.deadline_date and self.deadline_time:
            return datetime.datetime.combine(self.deadline_date, self.deadline_time)
        elif self.deadline_date:
            return datetime.datetime.combine(self.deadline_date, datetime.time.min)
        return None

    def __str__(self):
        return f"Задача {self.title} для пользователя {self.user}"
    
    class Meta:
        verbose_name = 'Задача'
        verbose_name_plural = 'Задачи'
