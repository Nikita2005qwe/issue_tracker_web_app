// Назначаем обработчики событий для всех кнопок "Важное"
document.addEventListener('DOMContentLoaded', () => {
    const completeButtons = document.querySelectorAll('.complete-btn');
    completeButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const taskId = button.getAttribute('data-task-id'); // Получаем ID задачи
            toggleIsCompleted(taskId);
        });
    });
});

// Функция для изменения параметра is_important у задачи
function toggleIsCompleted(taskId) {
    const url = `/issue_tracker/api/task/${taskId}/`; // URL для обновления задачи
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    // Находим элементы задачи
    const taskRow = document.querySelector(`.task-row[data-task-id="${taskId}"]`);
    const buttonComplete = taskRow.querySelector('.complete-btn');
    const currentIsCompleted = buttonComplete.classList.contains('completed');

    // Переключение состояния кнопки
    if (!currentIsCompleted) {
        buttonComplete.textContent = 'Выполнено';
        buttonComplete.classList.add('completed');
    } else {
        buttonComplete.textContent = 'Выполнить';
        buttonComplete.classList.remove('completed');
    }

    // Отправляем PATCH-запрос на сервер
    fetch(url, {
        method: 'PATCH', // Используем метод PATCH для частичного обновления
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken, // Добавляем CSRF-токен для безопасности
        },
        body: JSON.stringify({
            is_completed: !currentIsCompleted, // Устанавливаем значение is_important
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

            innerStar.classList.toggle('is_completed', data.is_completed);
        })
        .catch((error) => {
            console.error('Ошибка:', error);
        });
}
