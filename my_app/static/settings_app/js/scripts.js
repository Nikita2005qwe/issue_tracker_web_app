document.addEventListener('DOMContentLoaded', function () {
    // Находим все кнопки навигации
    const navButtons = document.querySelectorAll('.nav-button');
    const settingGroups = document.querySelectorAll('.setting-group');

    // Добавляем обработчик событий на каждую кнопку
    navButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Убираем класс "active" у всех кнопок
            navButtons.forEach(btn => btn.classList.remove('active'));

            // Добавляем класс "active" к текущей кнопке
            this.classList.add('active');

            // Скрываем все группы настроек
            settingGroups.forEach(group => group.style.display = 'none');

            // Показываем соответствующую группу
            const targetId = this.getAttribute('data-target');
            document.getElementById(targetId).style.display = 'block';
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    // Находим кнопку "крестик"
    const closeButton = document.querySelector('.success-message .close-button');

    // Добавляем обработчик события клика
    if (closeButton) {
        closeButton.addEventListener('click', function () {
            // Скрываем окно с сообщением
            closeButton.closest('.success-message').style.display = 'none';
        });
    }
});