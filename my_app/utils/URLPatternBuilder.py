from importlib import import_module
from functools import partial
from django.urls import path
from utils.FileUtils import FileUtils
from utils.ViewUtils import ViewUtils
from utils.FunctionsUtils import FunctionsUtils


class URLPatternBuilder:
    """
    Класс обеспечивающий функционал для построения url маршрутов
    и связи их с шаблонами html
    """
    @staticmethod
    def get_urls_patterns(app_name: str):
        """
        Функция возвращает готовый список url шаблонов
        :param app_name: Название приложения
        :return: Список с url-шаблонами
        """
        return URLPatternBuilder.build_patterns(f"routing/{app_name}/{app_name}_config.json")
    
    @staticmethod
    def build_patterns(config_data: str) -> list[partial]:
        """
        Функция предназначена для формирования urlpatterns
        на основе файла конфигурации config_data из папки routing
        в директории соответствующей текущему django application
        :param config_data: файл конфигурации формата json
        :return: возвращаем список для файла urls
        """
        config = FileUtils.load_json_file(config_data)  # Загружаем конфигурацию
        urlpatterns = []
        
        # Проходимся по каждому пункту конфигурации и создаем view-функции
        for view_name, params in config.items():
            # Создаем view-функцию
            view_function = ViewUtils.create_view_function(
                location_html_page=params["location_html_page"],
                requires_login=params["requires_login"],
                documentation=params["documentation"],
                get_context_function=FunctionsUtils.get_function_by_name(view_name)
            )
            
            # Добавляем маршрут
            urlpatterns.append(path(params["url_path"], view_function, name=view_name))
            
        return urlpatterns
    