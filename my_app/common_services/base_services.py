from typing import Any


class Context:
    """
    Класс содержащий функции для отображения контекста на страницах
    """
    
    @staticmethod
    def get_context_for_main_page() -> dict[str, Any]:
        """
        Функция возвращающая базовый контекст
        для отображения его на главной странице приложения
        :return:
        """
        ctx = {}
        
        return ctx
    