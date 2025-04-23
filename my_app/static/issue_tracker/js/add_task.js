// Функция для добавления новой задачи через API
function addTask() {
    console.log('Начало выполнения функции addTask'); // Лог: начало выполнения

    const form = document.getElementById('addTaskForm');
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const formData = new FormData(form);

    // Формируем данные для отправки
    const taskData = {
        title: formData.get('title'),
        section_id: parseInt(formData.get('section_id')) || null,
        deadline_date: formData.get('deadline_date') || null,
        deadline_time: formData.get('deadline_time') || null,
        user_id: formData.get('user_id'),
    };

    console.log('Сформированные данные для отправки:', taskData); // Лог: собранные данные

    // URL для добавления задачи
    const url = '/issue_tracker/api/task/';

    // Отправляем POST-запрос на сервер
    fetch(url, {
        method: 'POST', // Используем метод POST для создания задачи
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken, // Добавляем CSRF-токен для безопасности
        },
        body: JSON.stringify(taskData),
    })
        .then((response) => {
            console.log('Ответ от сервера получен:', response); // Лог: ответ от сервера
            if (!response.ok) {
                console.error('Ошибка HTTP:', response.status, response.statusText); // Лог: ошибка HTTP
                throw new Error('Ошибка при добавлении задачи');
            }
            return response.json();
        })
        .then((data) => {
            console.log('Задача успешно добавлена:', data); // Лог: успешное добавление

            // Очищаем форму и закрываем модальное окно
            form.reset();
            closeModal(document.getElementById('addTaskModal'));

            // Добавляем новую задачу в интерфейс
            addTaskToUI(data);
        })
        .catch((error) => {
            console.error('Произошла ошибка:', error); // Лог: ошибка
            alert(`Не удалось добавить задачу: ${error.message}`);
        });
}


// Обработчик отправки формы
document.getElementById('addTaskForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Предотвращаем стандартную отправку формы
    console.log('Форма отправлена, вызывается функция addTask'); // Лог: отправка формы
    addTask(); // Вызываем функцию для добавления задачи
});


function addTaskToUI(task) {
    // Находим контейнер задач для соответствующей секции
    const sectionContainer = document.querySelector(`.section[data-section-id="${task.section_id}"] .tasks-container`);
    if (!sectionContainer) {
        console.error('Секция с ID не найдена:', task.section_id);
        return;
    }

    // Создаём новый элемент задачи
    const newTask = document.createElement('div');
    newTask.classList.add('task-row');
    newTask.setAttribute('data-task-id', task.id);

    newTask.innerHTML = `
        <div class="task-content">
            <button class="favorite-btn" data-task-id="${task.id}">
                <div class="inner-star ${task.is_important ? 'important' : ''}"></div>
            </button>
            <span>${task.title}</span>
            ${task.deadline_date || task.deadline_time
                ? `<span class="task-deadline" data-deadline="${task.get_deadline}">
                    До: ${task.deadline_date || ''} ${task.deadline_time || ''}
                </span>`
                : `<span class="task-deadline">Срок не установлен</span>`}
        </div>
        <div class="task-actions">
            <button class="complete-btn ${task.is_completed ? 'completed' : ''}" data-task-id="${task.id}">
                ${task.is_completed ? 'Выполнено' : 'Выполнить'}
            </button>
            <button class="delete-btn" data-task-id="${task.id}">Удалить</button>
        </div>
    `;

    // Добавляем новую задачу в начало списка задач секции
    sectionContainer.prepend(newTask);
}