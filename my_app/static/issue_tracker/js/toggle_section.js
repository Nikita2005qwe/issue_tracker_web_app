// ==== Делегирование событий для кнопок сворачивания секций ====
document.getElementById('sectionsContainer').addEventListener('click', function (event) {
    // Проверяем, клик был именно по .toggle-section-btn
    if (event.target.closest('.toggle-section-btn')) {
        const button = event.target.closest('.toggle-section-btn');
        const section = button.closest('.section');
        const tasksContainer = section.querySelector('.tasks-container');
        const hr = section.querySelector('hr');

        button.classList.toggle('collapsed');
        const isCollapsed = button.classList.contains('collapsed');

        if (isCollapsed) {
            tasksContainer.style.display = 'none';
            hr.style.display = 'none';
        } else {
            tasksContainer.style.display = 'block';
            hr.style.display = 'block';
        }
    }
});