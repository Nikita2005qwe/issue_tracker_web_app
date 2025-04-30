const openAddTaskModalButton = document.getElementById('openAddTaskModalButton');
const openCreateSectionModalButton = document.getElementById('openCreateSectionModalButton');


// Функция для открытия модального окна
function openModal(modalWindow) {
    modalWindow.style.display = 'flex'; // Показываем модальное окно
}

// Функция для закрытия модального окна
function closeModal(modalWindow) {
    modalWindow.style.display = 'none'; // Скрываем модальное окно
}

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
