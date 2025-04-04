from typing import Optional, Any
from functools import wraps
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required


class ViewUtils:
    """
    Класс с различными разновидностями view функций
    Принимает функцию для передачи контекста
    и строку с названием ссылки
    """
    
    @staticmethod
    def get_wrapper(view_function: Optional[callable] = None, requires_login: bool = False):
        """
        Добавляем обёртку для view функции
        создающуюся в create_view_function

        :param view_function: Функция для проверки
        применяем ли мы декоратор при помощи @
        или получаем декоратор в переменную

        1 пример кода:
        my_decorator = get_wrapper(requires_login=True)

        @my_decorator
        def my_view(request):
            ...

        2 пример кода:
        @get_wrapper(requires_login=True)
        def my_view(request):
            ...

        Эта структура позволяет гибко управлять поведением функции
        в зависимости от того как она используется
        Если известно какая функция будет декорирована,
        то передача функции в момент вызова - самый простой вариант.
        Но если нужно динамически решать какие функции будут декорированы
        или хочешь повторно использовать декоратор,
        то полезно иметь возможность вернуть сам декоратор

        конструкция if view_function is not None:
        позволяет различать эти 2 сценария использования

        :param requires_login: нужен ли декоратор requires_login?
        :return:
        """
        
        def decorator(func):
            @wraps(func)
            def wrapper(request, *args, **kwargs):
                if requires_login:
                    return login_required(func)(request, *args, **kwargs)
                else:
                    return func(request, *args, **kwargs)
            
            return wrapper
        
        if view_function is not None:
            return decorator(view_function)
        
        return decorator
    
    @staticmethod
    def create_view_function(location_html_page: str, requires_login: bool,
                             documentation: Optional[str], get_context_function: Optional[callable]) -> callable:
        """
        :param documentation: Документация к view функции
        :param requires_login: добавлять ли декоратор login_required
        :param location_html_page: html страница для отображения
        :param get_context_function: контекст на странице
        :return: новая view функция
        """
        
        def view_function(request):
            """
            Функция отображает html страницу в браузере
            """
            view_function.__doc__ = documentation
            if get_context_function is not None:
                
                ctx = ViewUtils.get_context(request, get_context_function, requires_login)
                if request.method == "POST":
                    
                    return ViewUtils.go_redirect(request.path)
                
                return render(request, location_html_page, ctx)
            else:
                return render(request, location_html_page)
                
        return ViewUtils.get_wrapper(view_function, requires_login=requires_login)
    
    @staticmethod
    def get_context(request: Any,
                    get_context_function: Optional[callable],
                    requires_login: bool) -> Optional[dict[str, Any]]:
        """
        Функция учит получать контекст абстрактную view функцию
        :param request:
        :param get_context_function:
        :param requires_login:
        :return:
        """
        if requires_login:
            return get_context_function(request=request)

        return get_context_function()
    
    @staticmethod
    def go_redirect(path: str):
        """
        Прозводит перенаправление обратно на главную страницу
        
        Например после удаления задачи,
        требуется снова вернуться на ту же сраницу
        где мы были до этого.
        
        :param path:
        :return:
        """
        dict_of_redirect: dict[str, str] = {
            "/issue_tracker/delete_task": "issue_tracker:main",
            "/issue_tracker/add_task": "issue_tracker:main"
        }
        
        return redirect(dict_of_redirect[path])
        
        