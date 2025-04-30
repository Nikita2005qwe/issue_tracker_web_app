from typing import Any
from utils.DataBaseObjectsProcessing import DataBaseObjectsProcessing
from .models import UserSettings


class SettingsAppContext:
    @staticmethod
    def get_context_for_index_page(request: Any) -> dict[str, Any]:
        user_settings = DataBaseObjectsProcessing.get_objects_owned_by_user(UserSettings, request.user)[0]
        ctx = {
            'title': Messages.get_title(),
            "save_message": Messages.get_save_message(),
            'user_settings': user_settings,
            'current_theme': user_settings.theme,
        }
        
        return ctx
    

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
    