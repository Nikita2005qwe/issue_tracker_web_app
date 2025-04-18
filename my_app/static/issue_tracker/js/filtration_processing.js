//document.addEventListener('DOMContentLoaded', () => {
//    const tasksContainer = document.querySelector('.tasks-container');
//    const filterButtons = document.querySelectorAll('.filter-btn');
//
//    // Функция для загрузки задач с фильтром
//    function loadTasks(filter) {
//        let url = '/issue_tracker/';
//        if (filter === 'active') {
//            url += '?is_completed=false';
//        } else if (filter === 'completed') {
//            url += '?is_completed=true';
//        }
//
//        fetch(url)
//            .then((response) => {
//                if (!response.ok) {
//                    throw new Error('Ошибка при загрузке задач');
//                }
//                return response.json();
//            })
//            .then((data) => {
//                console.log('Данные с сервера:', data); // Отладочный вывод
//                renderTasks(data);
//            })
//            .catch((error) => {
//                console.error('Ошибка:', error);
//            });
//    }
//
//    // Функция для отрисовки задач
//    function renderTasks(data) {
//        tasksContainer.innerHTML = ''; // Очищаем контейнер
//
//        const tasks = data.results || data;
//        if (!Array.isArray(tasks)) {
//            console.error('tasks не является массивом:', tasks);
//            return;
//        }
//
//        tasks.forEach((task) => {
//            const taskElement = document.createElement('div');
//            taskElement.classList.add('task-row');
//            if (task.is_completed) {
//                taskElement.classList.add('completed');
//            }
//
//            taskElement.innerHTML = `
//                <div class="task-content">
//                    <button class="favorite-btn" data-task-id="${task.id}">
//                        <div class="inner-star ${task.is_important ? 'important' : ''}"></div>
//                    </button>
//                    <span>${task.title}</span>
//                </div>
//            `;
//
//            tasksContainer.appendChild(taskElement);
//        });
//    }
//
//    // Обработчик нажатия на кнопки фильтрации
//    filterButtons.forEach((button) => {
//        button.addEventListener('click', () => {
//            // Убираем класс 'active' у всех кнопок
//            filterButtons.forEach((btn) => btn.classList.remove('active'));
//
//            // Добавляем класс 'active' к текущей кнопке
//            button.classList.add('active');
//
//            // Загружаем задачи с выбранным фильтром
//            const filter = button.getAttribute('data-filter');
//            loadTasks(filter);
//        });
//    });
//
//    // Загружаем задачи при первой загрузке страницы
//    loadTasks('all');
//});


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
        console.log(tasks);


        // Очищаем видимость всех задач
        tasks.forEach(task => task.classList.remove('hidden'));

        // Применяем фильтр
        if (filterType === 'all') {
            // Показываем все задачи и все секции
            section.classList.remove('hidden');
        } else if (filterType === 'active') {
            // Скрываем выполненные задачи
            tasks.forEach(task => {
                if (task.querySelector('.complete-btn').textContent === 'Выполнено') {
                    task.classList.add('hidden');
                }
            });
        } else if (filterType === 'completed') {
            // Скрываем активные задачи
            tasks.forEach(task => {
                if (task.querySelector('.complete-btn').textContent !== 'Выполнено') {
                    task.classList.add('hidden');
                }
            });
        } else if (filterType === 'important') {
            // Скрываем задачи, которые не помечены как важные
            tasks.forEach(task => {
                const isImportant = task.querySelector('.inner-star').classList.contains('important');
                if (!isImportant) {
                    task.classList.add('hidden');
                }
            });
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

