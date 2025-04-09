// Получаем элементы модального окна
const deleteModal = document.getElementById('deleteTaskModal');
const cancelDeleteButton = document.getElementById('cancelDeleteButton');

const taskIdInput = document.getElementById('taskIdInput');
const taskTitleForDelete = document.getElementById('taskTitleForDelete');

const openAddTaskModalButton = document.getElementById('openAddTaskModalButton');
const addTaskModal = document.getElementById('addTaskModal');
const cancelAddTaskButton = document.getElementById('cancelAddTaskButton');

const userSettingsDiv = document.getElementById('userSettings');
const isActive = userSettingsDiv.getAttribute('data-is-active'); // Вернет строку
isActiveBoolean = isActive === "True";

// Функция для открытия модального окна
function openModal(modalWindow) {
    modalWindow.style.display = 'flex'; // Показываем модальное окно
}

// Функция для закрытия модального окна
function closeModal(modalWindow) {
    modalWindow.style.display = 'none'; // Скрываем модальное окно
}

//console.log(isActiveBoolean);

// Открытие модального окна или автоматическая отправка формы
document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function () {
        const taskId = this.getAttribute('data-task-id'); // Получаем ID задачи
        const taskRow = document.querySelector(`.task-row[data-task-id="${taskId}"]`); // Находим строку задачи
        const taskCell = taskRow.querySelector('td:nth-child(2)');

        if (!taskCell) {
            console.error('Ячейка с названием задачи не найдена');
            return;
        }

        const taskName = taskCell.textContent;

        // Устанавливаем ID задачи в скрытое поле формы
        taskIdInput.value = taskId;

        // Проверяем значение isActiveBoolean
        if (isActiveBoolean) {
            // Если true, показываем модальное окно
            taskTitleForDelete.textContent = taskName; // Устанавливаем название задачи в модальное окно
            openModal(deleteModal);
        } else {
            // Если false, отправляем форму автоматически
            deleteTaskForm.submit();
        }
    });
});

openAddTaskModalButton.addEventListener('click', function () {
    openModal(addTaskModal);
});

document.addEventListener('click', function (event) {
    // Проверяем, была ли нажата кнопка "Отмена"
    const modal = event.target.closest('.modal');
    if ((event.target.classList.contains('cancel-button') || event.target.classList.contains('overlay')) && modal) {
        closeModal(modal); // Закрываем модальное окно
    }
});
