// Находим элементы
const filterButton = document.querySelector('.filter-button-main');
const filtersSection = document.querySelector('.filters');

// Находим элементы
const filterButtons = document.querySelectorAll('.filter-btn');
const sections = document.querySelectorAll('.section');


// Добавляем обработчик события для кнопки
filterButton.addEventListener('click', () => {
    // Переключаем видимость раздела с фильтрами
    if (filtersSection.style.display === 'block') {
        filtersSection.style.display = 'none'; // Скрываем
    } else {
        filtersSection.style.display = 'block'; // Показываем
    }
});

// Функция для применения фильтра
function applyFilter(filterType) {
    sections.forEach(section => {
        const tasksContainer = section.querySelector('.tasks-container');
        const tasks = Array.from(tasksContainer.children); // Все задачи в секции


        // Очищаем видимость всех задач
        tasks.forEach(task => task.classList.remove('hidden'));

        // Выбор фильтра
        switch (filterType) {
            case 'all':
                // Показывать все задачи
                section.classList.remove('hidden');
                break;
            case 'active':
                // Скрывать выполненные задачи
                tasks.forEach((task) => {
                    const btnText = task.querySelector('.complete-btn').textContent.trim();
                    if (btnText === 'Выполнено') {
                        task.classList.add('hidden');
                    }
                });
                break;
            case 'completed':
                // Скрывать активные задачи
                tasks.forEach((task) => {
                    const btnText = task.querySelector('.complete-btn').textContent.trim();
                    if (btnText !== 'Выполнено') {
                        task.classList.add('hidden');
                    }
                });
                break;
            case 'important':
                // Оставлять только важные задачи
                tasks.forEach((task) => {
                    const star = task.querySelector('.inner-star');
                    if (!star || !star.classList.contains('important')) {
                        task.classList.add('hidden');
                    }
                });
                break;
        }

        // Скрываем пустые секции (кроме фильтра "Все задачи")
        if (filterType !== 'all') {
            const visibleTasks = tasks.filter(task => !task.classList.contains('hidden'));
            if (visibleTasks.length === 0) {
                section.classList.add('hidden');
            } else {
                section.classList.remove('hidden');
            }
        } else {
            // Для фильтра "Все задачи" всегда показываем секцию
            section.classList.remove('hidden');
        }
    });
}
// Добавляем обработчики событий для кнопок фильтров
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Убираем класс "active" у всех кнопок
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Добавляем класс "active" к текущей кнопке
        button.classList.add('active');

        // Получаем тип фильтра из атрибута data-filter
        const filterType = button.dataset.filter;

        // Применяем фильтр
        applyFilter(filterType);
    });
});
