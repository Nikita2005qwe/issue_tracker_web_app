// Получаем элементы модального окна
const deleteModal = document.getElementById('deleteTaskModal');
const cancelDeleteButton = document.getElementById('cancelDeleteButton');

const deleteSectionModal = document.getElementById('deleteSectionModal');
const cancelDeleteSectionButton = document.getElementById('cancelDeleteSectionButton');

const taskIdInput = document.getElementById('taskIdInput');
const taskTitleForDelete = document.getElementById('taskTitleForDelete');

const sectionIdInput = document.getElementById('sectionIdInput');
const sectionTitleForDelete = document.getElementById('sectionTitleForDelete');

const addTaskModal = document.getElementById('addTaskModal');
const addTaskSectionModal = document.getElementById('addTaskSectionModal');

const cancelAddTaskButton = document.getElementById('cancelAddTaskButton');
const cancelAddTaskSectionButton = document.getElementById('cancelAddTaskSectionButton');


document.addEventListener('DOMContentLoaded', function () {
    // Получаем ID текущего пользователя из HTML (например, из тега <meta>)
    const userId = document.querySelector('meta[name="user-id"]').getAttribute('content');

    // Заполняем скрытое поле user_id
    const userIdField = document.getElementById('userIdField');
    if (userIdField) {
        userIdField.value = userId;
    }
});