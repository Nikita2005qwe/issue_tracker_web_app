from issue_tracker.models import TaskSection
from typing import Any
from common_services.base_services import Context
from utils.FunctionsUtils import FunctionsUtils


class AuthorizationContext(Context):
    """
    Класс содержащий функции для отображения контекста на Главной странице проекта
    """
    
    @staticmethod
    @FunctionsUtils.register_function("index")
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
        # Создаем секцию "Основные"
        TaskSection.objects.create(title="Основные", user=user)
        
        