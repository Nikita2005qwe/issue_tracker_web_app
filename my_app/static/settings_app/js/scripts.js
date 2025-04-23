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
    const settingsId = document.getElementById('userSettings').getAttribute('data-user_settings-id');
    const settingUrl = `/settings/api/update-setting/${settingsId}/`;
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    // Берём ID и текущее состояние чекбокса
    const fieldName = checkboxElement.name;
    const newValue = checkboxElement.checked;
    console.log(settingsId);
    console.log(fieldName);
    console.log(newValue);

    // Отправляем PATCH-запрос на сервер
    fetch(settingUrl, {
        method: 'PATCH', // Используем метод PATCH для частичного обновления
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken, // Добавляем CSRF-токен для безопасности
        },
        body: JSON.stringify({
            fieldName: newValue, // Устанавливаем значение is_important
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Ошибка при обновлении задачи');
            }
            return response.json();
        })
        .then((data) => {
            console.log('Данные успешно обновлены:', data);

        })
        .catch((error) => {
            console.error('Ошибка:', error);
        });
}