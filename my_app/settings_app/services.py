from typing import Any
from django.contrib.auth.models import User
from utils.FunctionsUtils import FunctionsUtils
from utils.DataBaseObjectsProcessing import DataBaseObjectsProcessing
from .models import UserSettings


class SettingsAppContext:
    @staticmethod
    @FunctionsUtils.register_function("main_settings_app")
    def get_context_for_index_page(request: Any) -> dict[str, Any]:
        # собираем из сессии переменную is_saved, если находим её
        is_saved = request.session.pop('is_saved', False)
        ctx = {
            'title': Messages.get_title(),
            "save_message": Messages.get_save_message(),
            'is_saved': is_saved,
            'user_settings': DataBaseObjectsProcessing.get_objects_owned_by_user(UserSettings, request.user)[0]
        }
        
        return ctx
    
    @staticmethod
    @FunctionsUtils.register_function("save_settings")
    def get_context_after_save_settings(request: Any) -> dict[str, Any]:
        dict_of_parametrs: dict[str, Any] = {
            "warn_on_task_delete": request.POST.get('warn_on_task_delete') == 'on',
            "warn_on_task_section_delete": request.POST.get('warn_on_task_section_delete') == 'on'
        }
        SettingsAppContext.action_for_update_settings(user=request.user,
                                                      element_id=request.POST.get('element_id'),
                                                      dict_of_parametrs=dict_of_parametrs)
        
        return SettingsAppContext.get_context_for_index_page(request)
    
    @staticmethod
    def action_for_update_settings(user: User, element_id: str, dict_of_parametrs: dict[str, Any]) -> None:
        DataBaseObjectsProcessing.update_element(model_class=UserSettings,
                                                 user=user,
                                                 element_id=element_id,
                                                 dict_of_parametrs=dict_of_parametrs)

class Messages:
    """
    Класс отображающий сообщения на странице
    """
    @staticmethod
    def get_title() -> str:
        """
        Отобразить заголовок страницы
        :return:
        """
        title: str = "Настройки"
        return title
    
    @staticmethod
    def get_save_message() -> str:
        """
        Отобразить сообщение о сохранении настроек
        :return:
        """
        message: str = "Ваши настройки сохранены"
        return message
    