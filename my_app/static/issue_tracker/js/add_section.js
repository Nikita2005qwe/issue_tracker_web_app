//Функция для добавления новой секции через API
function addSection() {
    const form = document.getElementById('addTaskSectionForm');
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const formData = new FormData(form);

    // Формируем данные для отправки
    const sectionData = {
        title: formData.get('title'),
        user_id: formData.get('user_id'),
    };

    // URL для добавления секции
    const url = '/issue_tracker/api/section/';

    // Отправляем POST-запрос на сервер
    fetch(url, {
        method: 'POST', // Используем метод POST для создания секции
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken, // Добавляем CSRF-токен для безопасности
        },
        body: JSON.stringify(sectionData),
    })
        .then((response) => {
            console.log('Ответ от сервера получен:', response); // Лог: ответ от сервера
            if (!response.ok) {
                console.error('Ошибка HTTP:', response.status, response.statusText); // Лог: ошибка HTTP
                throw new Error('Ошибка при добавлении секции');
            }
            return response.json();
        })
        .then((data) => {
            console.log('Секция успешно добавлена:', data); // Лог: успешное добавление
            // Очищаем форму и закрываем модальное окно
            form.reset();
            closeModal(document.getElementById('addTaskSectionModal'));
            // Добавляем новую секцию в интерфейс
            addSectionToUI(data);
        })
        .catch((error) => {
            console.error('Произошла ошибка:', error); // Лог: ошибка
            alert(`Не удалось добавить секцию: ${error.message}`);
        });
}

//Обработчик отправки формы для создания секции
document.getElementById('addTaskSectionForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Предотвращаем стандартную отправку формы
    console.log('Форма отправлена, вызывается функция addSection'); // Лог: отправка формы
    addSection(); // Вызываем функцию для добавления секции
});

//Функция для добавления секции в интерфейс
function addSectionToUI(section) {
    // Создаём новый элемент секции
    const newSection = document.createElement('div');
    newSection.classList.add('section');
    newSection.setAttribute('data-section-id', section.id);
    newSection.innerHTML = `
        <div class="section-header">
            <h2>${section.title}</h2>
            <div class="section-actions">
                <button class="toggle-section-btn"></button>
                <button class="delete-section-btn" data-section-id="${section.id}"></button>
            </div>
        </div>
        <hr>
        <!-- Задачи в секции -->
        <div class="tasks-container">
            <!-- Здесь будут добавляться задачи -->
        </div>
    `;

    // Добавляем новую секцию в конец списка секций
    const sectionsContainer = document.getElementById('sectionsContainer');
    sectionsContainer.appendChild(newSection);

    // Добавляем обработчик событий для кнопки сворачивания
    const toggleButton = newSection.querySelector('.toggle-section-btn');
    toggleButton.addEventListener('click', function () {
        const tasksContainer = newSection.querySelector('.tasks-container');
        const hr = newSection.querySelector('hr');
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

    //Добавляем обработчик событий для кнопки удаления
    const deleteButton = newSection.querySelector('.delete-section-btn');
    deleteButton.addEventListener('click', function () {
        const sectionId = this.getAttribute('data-section-id');
        const sectionRow = document.querySelector(`.section[data-section-id="${sectionId}"]`);
        const sectionName = sectionRow.querySelector('.section-header h2').textContent;

        // Устанавливаем ID секции в скрытое поле формы
        sectionIdInput.value = sectionId;
        // Проверяем значение isActiveBooleanSWOTaskSectionD
        if (isActiveBooleanSWOTaskSectionD) {
            // Если true, показываем модальное окно
            sectionTitleForDelete.textContent = sectionName; // Устанавливаем название секции в модальное окно
            openModal(deleteSectionModal);
            document.querySelector('.confirm-button').addEventListener('click', function () {
                closeModal(deleteSectionModal); // Закрываем модальное окно
                deleteSection(sectionId); // Удаляем задачу
            });
        } else {
            // Если false, отправляем форму автоматически
            deleteSection(sectionId);
        }
    });
}
