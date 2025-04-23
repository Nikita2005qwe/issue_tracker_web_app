from django.contrib import admin
from .models import TaskSection, Task


class TaskAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "section_id", 'get_deadline', "is_completed", "is_important")
    list_display_links = ("id", "title")
    search_fields = ("id", "title")
    list_editable = ("is_completed", "is_important")
    list_filter = ("is_completed", "is_important")

    def get_deadline(self, obj):
        """Объединяет дату и время для отображения в админке."""
        if obj.deadline_date and obj.deadline_time:
            return f"{obj.deadline_date} {obj.deadline_time}"
        elif obj.deadline_date:
            return f"{obj.deadline_date}"
        elif obj.deadline_time:
            return f"{obj.deadline_time}"
        return "Срок не установлен"

    get_deadline.short_description = 'Крайний срок'  # Название столбца в админке


# Register your models here.
admin.site.register(TaskSection)
admin.site.register(Task, TaskAdmin)
