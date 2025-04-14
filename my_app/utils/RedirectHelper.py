from django.shortcuts import redirect
from typing import Any

class RedirectHelper:
    """
    Класс для обработки перенаправлений после выполнения определенных действий.
    """

    @staticmethod
    def go_redirect(request: Any):
        """
        Выполняет перенаправление на соответствующую страницу после выполнения действия.
        
        Например после удаления задачи, требуется снова вернуться на ту же сраницу где мы были до этого.

        Все пути, начинающиеся с "/issue_tracker/", автоматически перенаправляются
        на "issue_tracker:main", за исключением путей, указанных в словаре исключений.

        :param request: запрос содержащий метод post
        :return: Объект HttpResponseRedirect для перенаправления.
        """
        # Словарь исключений: для конкретных путей указываем особые редиректы
        exceptions: dict[str, str] = {
            "/settings/save": "settings_app:save_settings"
        }
        
        path: str = request.path
        
        
        
        # Если путь находится в исключениях, используем соответствующий редирект
        if path in exceptions:
            request.session['is_saved'] = True
            return redirect(exceptions[path])

        # Если путь начинается с "/issue_tracker/", перенаправляем на "issue_tracker:main"
        if path.startswith("/issue_tracker/"):
            return redirect("issue_tracker:main")

        # Если путь не подходит ни под одно из условий, выбрасываем ошибку
        raise ValueError(f"Неизвестный путь для перенаправления: {path}")
    