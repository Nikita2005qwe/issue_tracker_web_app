from django.db import models
from django.contrib.auth.models import User

class UserSettings(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='settings')
    warn_on_task_delete = models.BooleanField(default=True, verbose_name="Предупреждать при удалении задачи")

    def __str__(self):
        return f"Настройки для {self.user.username}"
    