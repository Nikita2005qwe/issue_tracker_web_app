
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