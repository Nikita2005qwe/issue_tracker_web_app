//Обработчик событий для переключения через кнопки навигации
//между разделами в настройках
document.addEventListener('DOMContentLoaded', function () {
    // Находим все кнопки навигации
    const navButtons = document.querySelectorAll('.nav-button');
    const settingGroups = document.querySelectorAll('.setting-group');

    // Добавляем обработчик событий на каждую кнопку
    navButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Убираем класс "active" у всех кнопок
            navButtons.forEach(btn => btn.classList.remove('active'));

            // Добавляем класс "active" к текущей кнопке
            this.classList.add('active');

            // Скрываем все группы настроек
            settingGroups.forEach(group => group.style.display = 'none');

            // Показываем соответствующую группу
            const targetId = this.getAttribute('data-target');
            document.getElementById(targetId).style.display = 'block';
        });
    });
});

//Обработчик события нажатия на крести при закрытии уведомления о сохранении настроек
document.addEventListener('DOMContentLoaded', function () {
    // Находим кнопку "крестик"
    const closeButton = document.querySelector('.success-message .close-button');

    // Добавляем обработчик события клика
    if (closeButton) {
        closeButton.addEventListener('click', function () {
            // Скрываем окно с сообщением
            closeButton.closest('.success-message').style.display = 'none';
        });
    }
});

// Функция для обновления конкретной настройки пользователя
async function updateSetting(checkboxElement) {
    try {
        // Получаем ID настроек из атрибута data-user_settings-id
        const settingsId = document.getElementById('userSettings').getAttribute('data-user_settings-id');
        const settingUrl = `/settings/api/update-setting/${settingsId}/`;
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        // Берём имя поля и текущее состояние чекбокса
        const fieldName = checkboxElement.name;
        const newValue = checkboxElement.value;

        console.log(`Updating field "${fieldName}" to ${newValue}`);

        // Формируем динамический объект для отправки
        const requestBody = {};
        if (newValue !== 'on') {
            requestBody[fieldName] = newValue;
        } else {
            requestBody[fieldName] = checkboxElement.checked;
        }

        // Отправляем PATCH-запрос на сервер
        const response = await fetch(settingUrl, {
            method: 'PATCH', // Используем метод PATCH для частичного обновления
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken, // Добавляем CSRF-токен для безопасности
            },
            body: JSON.stringify(requestBody),
        });

        // Проверяем статус ответа
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Ошибка при обновлении настроек');
        }

        // Получаем обновлённые данные
        const data = await response.json();
        console.log('Настройки успешно обновлены:', data);
        document.querySelector(".success-message").style.display = 'block';

    } catch (error) {
        console.error('Ошибка при обновлении настроек:', error.message);
        alert(`Не удалось обновить настройку: ${error.message}`);
    }
}