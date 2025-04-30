from typing import Type, Any
from django.db.models.query import QuerySet


class DataBaseObjectsProcessing:
    """
    Класс возвращающий фреймы объектов из
    необходимой зарегистрированной модели данных
    """
    
    @staticmethod
    def get_all_objects(model_class: Type) -> QuerySet:
        """
        Получить все объекты из необходимой модели
        :param model_class:
        :return:
        """
        return model_class.objects.all()
    
    @staticmethod
    def get_objects_owned_by_user(model_class: Type, user: Any) -> QuerySet:
        """
        Функция позволяет получить объекты необходимой модели model_class,
        принадлежащие какому либо пользователю user
        :param model_class:
        :param user:
        :return:
        """
        return model_class.objects.filter(user=user)
    
    @staticmethod
    def get_object_on_id(model_class: Type, user: Any, id_element: Any) -> QuerySet:
        """
        Позволяет найти элемент по его id в модели model_class
        приналежащй опреелённому пользователю user
        
        :param model_class:
        :param user:
        :param id_element: id элемента
        :return:
        """
        return model_class.objects.filter(id=id_element, user=user)
    
    @staticmethod
    def delete_element(model_class: Type, user: Any, element_id: Any) -> None:
        """
        Позволяет удалить элемент из базы данных по его id
        работает для моделей, которые имеют поле user
        :param model_class:
        :param user:
        :param element_id:
        :return:
        """
        element = DataBaseObjectsProcessing.get_object_on_id(model_class, user, element_id)
        element.delete()
    
    @staticmethod
    def create_element(model_class: Type, user: Any, dict_of_parametrs: dict[str, Any]) -> None:
        """
        Позволяет добавить новый элемент в базу данных.
        Работает для моделей, которые имеют поле user.
        
        :param dict_of_parametrs: Параметры элемента
        :param model_class: Класс модели Django.
        :param user: Пользователь, который привязан к создаваемому объекту.
        :param dict_of_parametrs: Ключевые аргументы, содержащие поля и значения для нового элемента.
        :return:
        """
        # Добавляем пользователя в список аргументов
        dict_of_parametrs['user'] = user

        # Создаем новый элемент
        model_class.objects.create(**dict_of_parametrs)
        
    @staticmethod
    def update_element(model_class: Type, user: Any, element_id: Any, dict_of_parametrs: dict[str, Any]) -> None:
        """
        Позволяет обновить элемент находящийся в базе данных
        :param element_id: id элемента
        :param model_class: новые параеметры элемента
        :param user: Пользователь, который привязан к создаваемому объекту.
        :param dict_of_parametrs: Ключевые аргументы, содержащие поля и значения для нового элемента.
        :return:
        """
        element = DataBaseObjectsProcessing.get_object_on_id(model_class, user, element_id)
        element.update(**dict_of_parametrs)
        