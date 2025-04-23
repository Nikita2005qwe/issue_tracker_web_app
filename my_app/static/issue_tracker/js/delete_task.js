document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', async function () {
        const taskId = this.getAttribute('data-task-id'); // Получаем ID задачи
        const taskRow = document.querySelector(`.task-row[data-task-id="${taskId}"]`);
        const taskContent = taskRow.querySelector('.task-content span');

        if (!taskContent) {
            console.error('Элемент с названием задачи не найден');
            return;
        }

        const taskName = taskContent.textContent;

        // Устанавливаем название задачи в модальном окне
        document.getElementById('taskTitleForDelete').textContent = taskName;

        // Проверяем значение isActiveBooleanSWOTaskD
        if (isActiveBooleanSWOTaskD) {
            // Если true, показываем модальное окно
            openModal(deleteModal);
        } else {
            // Если false, удаляем задачу автоматически
            await deleteTask(taskId);
        }
    });
});

async function deleteTask(taskId) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    try {
        // Отправляем DELETE-запрос на сервер
        const response = await fetch(`/api/task/${taskId}/`, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': csrfToken,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Ошибка при удалении задачи');
        }

        console.log('Задача успешно удалена');

        // Удаляем строку задачи из DOM
        const taskRow = document.querySelector(`.task-row[data-task-id="${taskId}"]`);
        if (taskRow) {
            taskRow.remove();
        }

        // Закрываем модальное окно, если оно открыто
        closeModal(document.getElementById('deleteTaskModal'));

        alert('Задача успешно удалена!');
    } catch (error) {
        console.error('Ошибка:', error.message);
        alert(`Не удалось удалить задачу: ${error.message}`);
    }
}

// Обработчик кнопки "Удалить" в модальном окне
document.getElementById('deleteTaskForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Предотвращаем стандартную отправку формы

    const taskId = document.getElementById('taskIdInput').value;
    await deleteTask(taskId);
});