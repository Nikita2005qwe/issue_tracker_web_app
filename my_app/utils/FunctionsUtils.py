from typing import Optional


class FunctionsUtils:
    """
    Класс обрабатывающий объекты функций
    """
    registered_functions: dict[str, callable] = dict()

    @staticmethod
    def register_function(key: str):
        """
        Декоратор для регистрации функций в словаре registered_functions.

        :param key: Ключ, под которым функция будет зарегистрирована.
        """
    
        def decorator(func: callable):
            # Сохраняем функцию в словаре под указанным ключом
            FunctionsUtils.registered_functions[key] = func
            
            return func
    
        return decorator

    @staticmethod
    def get_function_by_name(function_name: Optional[str]) -> Optional[callable]:
        """
        Динамический импорт функции

        Обязательно в файле конфигурации указывать
        Класс функции и название функции через точку
        :param function_name: Имя функции.
        :return: Объект функции.
        """
        try:
            if function_name is not None:
                return FunctionsUtils.registered_functions[function_name]
        except KeyError:
            pass
        return None
    