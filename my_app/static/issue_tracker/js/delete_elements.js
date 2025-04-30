// Получаем флаги из DOM
const userSettingsDiv = document.getElementById('userSettings');
const showWarnOnTaskDelete = userSettingsDiv.getAttribute('data-show-warn-on-task-delete') === "True";
const showWarnOnSectionDelete = userSettingsDiv.getAttribute('data-show-warn-on-task-section-delete') === "True";

// ==== Делегирование событий для универсального удаления ====
document.getElementById('sectionsContainer').addEventListener('click', function (event) {
    const target = event.target;

    // Обработка удаления задачи
    const deleteTaskBtn = target.closest('.delete-btn');
    if (deleteTaskBtn) {
        const taskId = deleteTaskBtn.getAttribute('data-task-id');
        const taskName = deleteTaskBtn.closest('.task-row')?.querySelector('.task-content span')?.textContent;

        if (!taskId || !taskName) return;

        if (showWarnOnTaskDelete) {
            taskTitleForDelete.textContent = taskName;
            openModal(deleteModal);

            const confirmBtn = deleteModal.querySelector('.confirm-button');
            confirmBtn.onclick = null;

            confirmBtn.addEventListener('click', () => {
                closeModal(deleteModal);
                deleteItem('task', taskId);
            }, { once: true });

        } else {
            deleteItem('task', taskId);
        }
    }

    // Обработка удаления секции
    const deleteSectionBtn = target.closest('.delete-section-btn');
    if (deleteSectionBtn) {
        const sectionId = deleteSectionBtn.getAttribute('data-section-id');
        const sectionElement = document.querySelector(`.section[data-section-id="${sectionId}"]`);
        const sectionName = sectionElement?.querySelector('.section-header h2')?.textContent;

        if (!sectionId || !sectionName) return;

        if (showWarnOnSectionDelete) {
            sectionTitleForDelete.textContent = sectionName;
            openModal(deleteSectionModal);

            const confirmBtn = deleteSectionModal.querySelector('.confirm-button');
            confirmBtn.onclick = null;

            confirmBtn.addEventListener('click', () => {
                closeModal(deleteSectionModal);
                deleteItem('section', sectionId);
            }, { once: true });

        } else {
            deleteItem('section', sectionId);
        }
    }
});

// === Универсальная функция для удаления через API ===
function deleteItem(type, id) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const url = `/issue_tracker/api/${type}/${id}/`;

    if (!csrfToken) {
        alert('CSRF-токен не найден.');
        return;
    }

    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        },
    })
    .then(response => {
        if (!response.ok && response.status !== 204) {
            throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
        }
        return response.status === 204 ? {} : response.json();
    })
    .then(data => {
        console.log(`${type} успешно удалён(а):`, data);
        removeItemFromUI(type, id);
    })
    .catch(error => {
        console.error(`Не удалось удалить ${type}:`, error);
        alert(`Не удалось удалить ${type}: ${error.message}`);
    });
}

// === Удаление из интерфейса ===
function removeItemFromUI(type, id) {
    if (type === 'task') {
        const taskRow = document.querySelector(`.task-row[data-task-id="${id}"]`);
        if (taskRow) taskRow.remove();

    } else if (type === 'section') {
        const section = document.querySelector(`.section[data-section-id="${id}"]`);
        const option = document.getElementById('sectionSelect')?.querySelector(`option[value="${id}"]`);

        if (section) section.remove();
        if (option) option.remove();
    }
}