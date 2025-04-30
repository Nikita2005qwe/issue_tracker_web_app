// Функция для изменения параметра is_important у задачи
function toggleIsImportant(taskId) {
    const url = `/issue_tracker/api/task/${taskId}/`; // URL для обновления задачи
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    // Находим элементы задачи
    const taskRow = document.querySelector(`.task-row[data-task-id="${taskId}"]`);
    const innerStar = taskRow.querySelector('.inner-star');
    const currentIsImportant = innerStar.classList.contains('important');

    // Отправляем PATCH-запрос на сервер
    fetch(url, {
        method: 'PATCH', // Используем метод PATCH для частичного обновления
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken, // Добавляем CSRF-токен для безопасности
        },
        body: JSON.stringify({
            is_important: !currentIsImportant, // Устанавливаем значение is_important
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Ошибка при обновлении задачи');
            }
            return response.json();
        })
        .then((data) => {
            console.log('Задача успешно обновлена:', data);

            innerStar.classList.toggle('important', data.is_important);
        })
        .catch((error) => {
            console.error('Ошибка:', error);
        });
}

// Назначаем обработчики событий для всех кнопок "Важное"
document.addEventListener('DOMContentLoaded', () => {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const taskId = button.getAttribute('data-task-id'); // Получаем ID задачи
            toggleIsImportant(taskId);
        });
    });
});