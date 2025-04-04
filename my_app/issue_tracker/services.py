from typing import Any
from django.contrib.auth.models import User
from common_services.base_services import Context
from utils.DataBaseObjectsProcessing import DataBaseObjectsProcessing
from utils.FunctionsUtils import FunctionsUtils
from issue_tracker.models import TaskSection, Task


class IssueTrackerContext(Context):
    """
    Класс содержащий функции для отображения контекста на Главной странице
    приложения issue_tracker
    """
    
    @staticmethod
    @FunctionsUtils.register_function("add_task")
    def get_context_after_add_task(request: Any) -> dict[str, Any]:
        
        dict_of_parametrs: dict[str, Any] = {
            "title": request.POST.get('title'),
            "is_completed": False,
            "is_important": request.POST.get('is_important') == 'on',
            "section_id": DataBaseObjectsProcessing.get_object_on_id(TaskSection, request.user, request.POST.get('section_id'))[0]
        }
        
        IssueTrackerContext.action_for_add_element(Task, request.user, dict_of_parametrs)
    
        ctx = IssueTrackerContext.get_context_for_index_page(request)
        return ctx
    
    @staticmethod
    def action_for_add_element(model: Any, user: User, dict_of_parametrs: dict[str, Any]) -> None:
        DataBaseObjectsProcessing.create_element(model_class=model, user=user, dict_of_parametrs=dict_of_parametrs)
    
    @staticmethod
    @FunctionsUtils.register_function("delete_task")
    def get_context_after_delete(request: Any) -> dict[str, Any]:
        IssueTrackerContext.action_for_delete_task(request.user, request.POST.get('task_id'))
        
        ctx = IssueTrackerContext.get_context_for_index_page(request)
        return ctx
    
    @staticmethod
    def action_for_delete_task(user: User, task_id: str) -> None:
        DataBaseObjectsProcessing.delete_element(Task, user, task_id)
    
    @staticmethod
    @FunctionsUtils.register_function("main")
    def get_context_for_index_page(request: Any) -> dict[str, Any]:

        ctx = {
            'sections': DataBaseObjectsProcessing.get_objects_owned_by_user(TaskSection, request.user),
            'tasks': DataBaseObjectsProcessing.get_objects_owned_by_user(Task, request.user)
        }
        
        return ctx
    