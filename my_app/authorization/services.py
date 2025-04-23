from issue_tracker.models import TaskSection
from settings_app.models import UserSettings
from typing import Any
from utils.FunctionsUtils import FunctionsUtils
from utils.DataBaseObjectsProcessing import DataBaseObjectsProcessing


class AuthorizationContext:
    """
    Класс содержащий функции для отображения контекста на Главной странице проекта
    """
    
    @staticmethod
    def get_context_for_index_page() -> dict[str, Any]:
        
        ctx = {
            'hello_msg': Messages.get_hello_message()
        }
        
        return ctx
    
    
class Messages:
    """
    Класс отображающий сообщения на странице
    """
    @staticmethod
    def get_hello_message() -> str:
        """
        Отправить приветственное письмо в начале страницы
        :return:
        """
        msg = "Мы рады видеть вас здесь. Наш сайт предлагает уникальные возможности для наших пользователей. " \
              "Присоединяйтесь к нам и наслаждайтесь всеми преимуществами нашего сервиса."
        return msg


class ActionAfterCreatingUsers:
    """
    Класс с функциями для совершения действий системой после регистрации пользователя
    """
    
    @staticmethod
    def create_default_sections(user) -> None:
        """
        Создаёт секции по умолчанию
        :param user: зарегистрированный пользователь
        :return:
        """
        parametrs = {
            "title": 'Основные'
        }
        DataBaseObjectsProcessing.create_element(TaskSection, user, parametrs)

        parametrs = {}
        DataBaseObjectsProcessing.create_element(UserSettings, user, parametrs)
        