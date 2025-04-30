
const userSettingsDiv = document.getElementById('userSettings');
const isSWOTaskD = userSettingsDiv.getAttribute('data-show-warn-on-task-delete');
const isSWOTaskSectionD = userSettingsDiv.getAttribute('data-show-warn-on-task-section-delete');
isActiveBooleanSWOTaskD = isSWOTaskD === "True";
isActiveBooleanSWOTaskSectionD = isSWOTaskSectionD === "True";

// Функция для удаления задачи через API
function deleteTask(taskId) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const url = `/issue_tracker/api/task/${taskId}/`; // URL для удаления задачи

    fetch(url, {
        method: 'DELETE', // Используем метод DELETE для удаления задачи
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken, // Добавляем CSRF-токен для безопасности
        },
    })
        .then((response) => {
            console.log('Ответ от сервера получен:', response); // Лог: ответ от сервера
            if (!response.ok) {
                throw new Error('Ошибка при удалении задачи');
            }
            return response;
        })
        .then((data) => {
            console.log('Задача успешно удалена:', data);
            // Удаляем задачу из интерфейса
            removeTaskFromUI(taskId);
        })
        .catch((error) => {
            console.error('Произошла ошибка:', error);
            alert(`Не удалось удалить задачу: ${error.message}`);
        });
}

// Функция для удаления задачи из интерфейса
function removeTaskFromUI(taskId) {
    const taskRow = document.querySelector(`.task-row[data-task-id="${taskId}"]`);
    if (taskRow) {
        taskRow.remove(); // Удаляем строку задачи из DOM
    } else {
        console.error('Элемент задачи не найден в интерфейсе:', taskId);
    }
}


document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function () {
        const taskId = this.getAttribute('data-task-id'); // Получаем ID задачи
        const taskRow = document.querySelector(`.task-row[data-task-id="${taskId}"]`); // Находим строку задачи
        const taskContent = taskRow.querySelector('.task-content span');

        if (!taskContent) {
            console.error('Элемент с названием задачи не найден');
            return;
        }

        const taskName = taskContent.textContent;

        // Проверяем значение isActiveBooleanSWOTaskD
        if (isActiveBooleanSWOTaskD) {
            // Если true, показываем модальное окно
            taskTitleForDelete.textContent = taskName; // Устанавливаем название задачи в модальное окно
            openModal(deleteModal);

            // Обработчик подтверждения удаления
            document.querySelector('.confirm-button').addEventListener('click', function () {
                closeModal(deleteModal); // Закрываем модальное окно
                deleteTask(taskId); // Удаляем задачу
            });
        } else {
            // Если false, удаляем задачу автоматически
            deleteTask(taskId);
        }
    });
});


// Функция для удаления секции через API
function deleteSection(sectionId) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const url = `/issue_tracker/api/section/${sectionId}/`; // URL для удаления секции

    fetch(url, {
        method: 'DELETE', // Используем метод DELETE для удаления секции
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken, // Добавляем CSRF-токен для безопасности
        },

    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Ошибка при удалении секции');
            }
            return response;
        })
        .then((data) => {
            console.log('Секция успешно удалена:', data);
            // Удаляем секцию из интерфейса
            removeSectionFromUI(sectionId);
        })
        .catch((error) => {
            console.error('Произошла ошибка:', error);
            alert(`Не удалось удалить секцию: ${error.message}`);
        });
}

// Функция для удаления секции из интерфейса
function removeSectionFromUI(sectionId) {
    const sectionElement = document.querySelector(`.section[data-section-id="${sectionId}"]`);
    if (sectionElement) {
        sectionElement.remove(); // Удаляем секцию из DOM
    } else {
        console.error('Элемент секции не найден в интерфейсе:', sectionId);
    }
}


document.querySelectorAll('.delete-section-btn').forEach(button => {
    button.addEventListener('click', function () {
        const sectionId = this.getAttribute('data-section-id'); // Получаем ID секции
        const sectionRow = document.querySelector(`.section[data-section-id="${sectionId}"]`); // Находим строку секции
        const sectionContent = sectionRow.querySelector('.section-header h2');

        if (!sectionContent) {
            console.error('Элемент с названием секции не найден');
            return;
        }

        const sectionName = sectionContent.textContent;

        // Проверяем значение isActiveBooleanSWOTaskSectionD
        if (isActiveBooleanSWOTaskSectionD) {
            // Если true, показываем модальное окно
            sectionTitleForDelete.textContent = sectionName; // Устанавливаем название секции в модальное окно
            openModal(deleteSectionModal);

            // Обработчик подтверждения удаления
            document.querySelector('.confirm-button').addEventListener('click', function () {
                closeModal(deleteSectionModal); // Закрываем модальное окно
                deleteSection(sectionId); // Удаляем секцию
            });
        } else {
            // Если false, удаляем секцию автоматически
            deleteSection(sectionId);
        }
    });
});