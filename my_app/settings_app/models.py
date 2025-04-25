from django.db import models
from django.contrib.auth.models import User

class UserSettings(models.Model):
    THEME_CHOICES = [
        ('light', 'Светлая тема'),
        ('dark', 'Тёмная тема'),
        ('custom', 'Персонализированная тема'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='settings')
    warn_on_task_delete = models.BooleanField(default=True, verbose_name="Предупреждать при удалении задачи")
    warn_on_task_section_delete = models.BooleanField(default=True, verbose_name="Предупреждать при удалении секции")
    email_notifications = models.BooleanField(default=True, verbose_name="Отправление уведомлений по email")
    theme = models.CharField(
        max_length=10,
        choices=THEME_CHOICES,
        default='light',
        verbose_name="Тема интерфейса"
    )

    def __str__(self):
        return f"Настройки для {self.user.username}"
    