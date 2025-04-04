import json


class FileUtils:
    @staticmethod
    def load_json_file(file_path: str) -> dict:
        """
        Загрузка данных из JSON-файла
        :param file_path: Путь к JSON-файлу
        :return: Словарь с данными
        """
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                data = json.load(file)
            return data
        except FileNotFoundError:
            print(f"Файл '{file_path}' не найден.")
            return {}
        except json.JSONDecodeError:
            print(f"Ошибка декодирования JSON в файле '{file_path}'.")
            return {}
        