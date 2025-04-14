// Получаем элементы модального окна
const deleteModal = document.getElementById('deleteTaskModal');
const cancelDeleteButton = document.getElementById('cancelDeleteButton');

const deleteSectionModal = document.getElementById('deleteSectionModal');
const cancelDeleteSectionButton = document.getElementById('cancelDeleteSectionButton');

const taskIdInput = document.getElementById('taskIdInput');
const taskTitleForDelete = document.getElementById('taskTitleForDelete');

const sectionIdInput = document.getElementById('sectionIdInput');
const sectionTitleForDelete = document.getElementById('sectionTitleForDelete');

const openAddTaskModalButton = document.getElementById('openAddTaskModalButton');
const openCreateSectionModalButton = document.getElementById('openCreateSectionModalButton');

const addTaskModal = document.getElementById('addTaskModal');
const addTaskSectionModal = document.getElementById('addTaskSectionModal');

const cancelAddTaskButton = document.getElementById('cancelAddTaskButton');
const cancelAddTaskSectionButton = document.getElementById('cancelAddTaskSectionButton');

const userSettingsDiv = document.getElementById('userSettings');
const isSWOTaskD = userSettingsDiv.getAttribute('data-show-warn-on-task-delete');
const isSWOTaskSectionD = userSettingsDiv.getAttribute('data-show-warn-on-task-section-delete');
isActiveBooleanSWOTaskD = isSWOTaskD === "True";
isActiveBooleanSWOTaskSectionD = isSWOTaskSectionD === "True";

// Функция для открытия модального окна
function openModal(modalWindow) {
    modalWindow.style.display = 'flex'; // Показываем модальное окно
}

// Функция для закрытия модального окна
function closeModal(modalWindow) {
    modalWindow.style.display = 'none'; // Скрываем модальное окно
}

//console.log(isActiveBooleanSWOTaskSectionD);

// Открытие модального окна или автоматическая отправка формы
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

        // Устанавливаем ID задачи в скрытое поле формы
        taskIdInput.value = taskId;

        // Проверяем значение isActiveBoolean
        if (isActiveBooleanSWOTaskD) {
            // Если true, показываем модальное окно
            taskTitleForDelete.textContent = taskName; // Устанавливаем название задачи в модальное окно
            openModal(deleteModal);
        } else {
            // Если false, отправляем форму автоматически
            deleteTaskForm.submit();
        }
    });
});


// Открытие модального окна при удалении секции или автоматическая отправка формы
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

        // Устанавливаем ID секции в скрытое поле формы
        sectionIdInput.value = sectionId;

        // Проверяем значение isActiveBooleanSWOTaskSectionD
        if (isActiveBooleanSWOTaskSectionD) {
            // Если true, показываем модальное окно
            sectionTitleForDelete.textContent = sectionName; // Устанавливаем название секции в модальное окно
            openModal(deleteSectionModal);
        } else {
            // Если false, отправляем форму автоматически
            deleteSectionForm.submit();
        }
    });
});

openAddTaskModalButton.addEventListener('click', function () {
    openModal(addTaskModal);
});

openCreateSectionModalButton.addEventListener('click', function () {
    openModal(addTaskSectionModal);
});

document.addEventListener('click', function (event) {
    // Проверяем, была ли нажата кнопка "Отмена"
    const modal = event.target.closest('.modal');
    if ((event.target.classList.contains('cancel-button') || event.target.classList.contains('overlay')) && modal) {
        closeModal(modal); // Закрываем модальное окно
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const toggleButtons = document.querySelectorAll('.toggle-section-btn');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            const section = this.closest('.section');
            const tasksContainer = section.querySelector('.tasks-container');
            const hr = section.querySelector('hr');

            this.classList.toggle('collapsed');
            const isCollapsed = this.classList.contains('collapsed');

            if (isCollapsed) {
                tasksContainer.style.display = 'none';
                hr.style.display = 'none';
            } else {
                tasksContainer.style.display = 'block';
                hr.style.display = 'block';
            }
        });
    });
});

// Функция для переключения состояния кнопки
function toggleStar() {
    const innerStar = document.querySelector('.inner-star');
    innerStar.classList.toggle('active'); // Переключаем класс 'active'
}