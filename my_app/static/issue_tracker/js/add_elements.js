// === Универсальная функция для добавления элемента через API ===
function addItem(itemType, formId, apiEndpoint) {
    const form = document.getElementById(formId);
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;

    if (!form || !csrfToken) {
        console.error("Форма или CSRF-токен не найдены");
        return;
    }

    const formData = new FormData(form);

    // === Формируем данные объекта ===
    let itemData = {};
    if (itemType === 'task') {
        itemData = {
            title: formData.get('title'),
            section_id: parseInt(formData.get('section_id')) || null,
            deadline_date: formData.get('deadline_date') || null,
            deadline_time: formData.get('deadline_time') || null,
            user_id: formData.get('user_id'),
            is_important: formData.get('is_important') === 'on',
        };
    } else if (itemType === 'section') {
        itemData = {
            title: formData.get('title'),
            user_id: formData.get('user_id'),
        };
    }

    fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(itemData),
    })
    .then(response => {
        if (!response.ok) throw new Error(`Ошибка при добавлении ${itemType}`);
        return response.json();
    })
    .then(data => {
        console.log(`${itemType} успешно добавлен(а):`, data);
        form.reset(); // очистка формы
        const modal = document.getElementById(form.closest('.modal')?.id);
        if (modal) closeModal(modal); // закрытие модального окна
        addItemToUI(data, itemType);
    })
    .catch(error => {
        console.error(`Не удалось добавить ${itemType}:`, error);
        alert(`Не удалось добавить ${itemType}: ${error.message}`);
    });
}

// === Универсальное добавление элемента в интерфейс ===
function addItemToUI(item, itemType) {
    let element;

    if (itemType === 'task') {
        const sectionContainer = document.querySelector(`.section[data-section-id="${item.section_id}"] .tasks-container`);
        if (!sectionContainer) {
            console.error('Контейнер задач не найден:', item.section_id);
            return;
        }

        element = document.createElement('div');
        element.classList.add('task-row');
        element.setAttribute('data-task-id', item.id);
        element.innerHTML = `
            <div class="task-content">
                <button class="favorite-btn" data-task-id="${item.id}">
                    <div class="inner-star ${item.is_important ? 'important' : ''}"></div>
                </button>
                <span>${item.title}</span>
                ${item.deadline_date || item.deadline_time
                    ? `<span class="task-deadline">До: ${item.deadline_date || ''} ${item.deadline_time || ''}</span>`
                    : `<span class="task-deadline">Срок не установлен</span>`}
            </div>
            <div class="task-actions">
                <button class="complete-btn ${item.is_completed ? 'completed' : ''}" data-task-id="${item.id}">
                    ${item.is_completed ? 'Выполнено' : 'Выполнить'}
                </button>
                <button class="delete-btn" data-task-id="${item.id}">Удалить</button>
            </div>
        `;
        sectionContainer.prepend(element);

    } else if (itemType === 'section') {
        element = document.createElement('div');
        element.classList.add('section');
        element.setAttribute('data-section-id', item.id);
        element.innerHTML = `
            <div class="section-header">
                <h2>${item.title}</h2>
                <div class="section-actions">
                    <button class="toggle-section-btn"></button>
                    <button class="delete-section-btn" data-section-id="${item.id}"></button>
                </div>
            </div>
            <hr>
            <div class="tasks-container"></div>
        `;
        document.getElementById('sectionsContainer').appendChild(element);

        // Добавляем в выпадающий список
        const sectionSelect = document.getElementById('sectionSelect');
        if (sectionSelect && !sectionSelect.querySelector(`option[value="${item.id}"]`)) {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.title;
            sectionSelect.appendChild(option);
        }
    }
}

document.getElementById('addTaskForm')?.addEventListener('submit', e => {
    e.preventDefault();
    addItem('task', 'addTaskForm', '/issue_tracker/api/task/');
});

document.getElementById('addTaskSectionForm')?.addEventListener('submit', e => {
    e.preventDefault();
    addItem('section', 'addTaskSectionForm', '/issue_tracker/api/section/');
});