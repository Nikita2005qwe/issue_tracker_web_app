from typing import Any
from utils.DataBaseObjectsProcessing import DataBaseObjectsProcessing
from .models import TaskSection, Task
from settings_app.models import UserSettings


class IssueTrackerContext:
    """
    Класс содержащий функции для отображения контекста на Главной странице
    приложения issue_tracker
    """

    @staticmethod
    def get_context_for_index_page(request: Any) -> dict[str, Any]:
        ctx = {
            'sections': DataBaseObjectsProcessing.get_objects_owned_by_user(TaskSection, request.user),
            'tasks': DataBaseObjectsProcessing.get_objects_owned_by_user(Task, request.user),
            "user_settings": DataBaseObjectsProcessing.get_objects_owned_by_user(UserSettings, request.user)[0]
        }

        return ctx
