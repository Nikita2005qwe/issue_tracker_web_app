from typing import Any
from django.contrib.auth.models import User
from utils.DataBaseObjectsProcessing import DataBaseObjectsProcessing
from utils.FunctionsUtils import FunctionsUtils
from issue_tracker.models import TaskSection, Task
from settings_app.models import UserSettings


class IssueTrackerContext:
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
            "section_id":
                DataBaseObjectsProcessing.get_object_on_id(TaskSection, request.user, request.POST.get('section_id'))[
                    0]
        }
        
        if request.POST.get('deadline') != "":
            dict_of_parametrs["deadline"] = request.POST.get('deadline')
        
        IssueTrackerContext.action_for_element(
            method=DataBaseObjectsProcessing.create_element,
            model=Task,
            user=request.user,
            parametrs=dict_of_parametrs
        )
    
        ctx = IssueTrackerContext.get_context_for_index_page(request)
        return ctx
    
    @staticmethod
    @FunctionsUtils.register_function("add_task_section")
    def get_context_after_add_task_section(request: Any) -> dict[str, Any]:
        dict_of_parametrs: dict[str, Any] = {
            "title": request.POST.get('title')
        }

        IssueTrackerContext.action_for_element(
            method=DataBaseObjectsProcessing.create_element,
            model=TaskSection,
            user=request.user,
            parametrs=dict_of_parametrs
        )
        
        ctx = IssueTrackerContext.get_context_for_index_page(request)
        return ctx
    
    @staticmethod
    @FunctionsUtils.register_function("delete_task_section")
    def get_context_after_delete_section(request: Any) -> dict[str, Any]:
        
        IssueTrackerContext.action_for_element(
            method=DataBaseObjectsProcessing.delete_element,
            model=TaskSection,
            user=request.user,
            parametrs=request.POST.get('section_id')
        )
    
        ctx = IssueTrackerContext.get_context_for_index_page(request)
        return ctx
    
    @staticmethod
    @FunctionsUtils.register_function("delete_task")
    def get_context_after_delete_task(request: Any) -> dict[str, Any]:

        IssueTrackerContext.action_for_element(
            method=DataBaseObjectsProcessing.delete_element,
            model=Task,
            user=request.user,
            parametrs=request.POST.get('task_id')
        )
        
        ctx = IssueTrackerContext.get_context_for_index_page(request)
        return ctx

    @staticmethod
    @FunctionsUtils.register_function("main")
    def get_context_for_index_page(request: Any) -> dict[str, Any]:

        ctx = {
            'sections': DataBaseObjectsProcessing.get_objects_owned_by_user(TaskSection, request.user),
            'tasks': DataBaseObjectsProcessing.get_objects_owned_by_user(Task, request.user),
            "user_settings": DataBaseObjectsProcessing.get_objects_owned_by_user(UserSettings, request.user)[0]
        }
        
        return ctx

    @staticmethod
    def action_for_element(method: callable, model: Any, user: User, parametrs: str | dict[str, Any]) -> bool:
        """
        Производит действия добавления или удаления с элементами модели

        :param method: удалить или добавить
        :param model: модель с которой производим действия
        :param user: пользователь к которому прикреплены элементы модели
        :param parametrs: параметры это id удаляемого элемента или параметры содаваемого элемента
        :return: подтверждение об успешном действии
        """
        method(model, user, parametrs)
        return True
    