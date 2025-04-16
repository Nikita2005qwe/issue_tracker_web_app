from django.contrib import admin
from .models import TaskSection, Task


class TaskAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "section_id", "deadline", "is_completed", "is_important")
    list_display_links = ("id", "title")
    search_fields = ("id", "title")
    list_editable = ("is_completed", "is_important")
    list_filter = ("is_completed", "is_important")


# Register your models here.
admin.site.register(TaskSection)
admin.site.register(Task, TaskAdmin)
