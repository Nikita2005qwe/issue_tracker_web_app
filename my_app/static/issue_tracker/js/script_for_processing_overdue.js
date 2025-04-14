document.addEventListener('DOMContentLoaded', function () {
    const taskRows = document.querySelectorAll('.task-row');

    taskRows.forEach(row => {
        const deadlineElement = row.querySelector('.task-deadline');
        const deadlineText = deadlineElement.textContent.trim();

        // Если есть дата, проверяем, не просрочена ли она
        if (!deadlineText.includes('Срок не установлен')) {
            const deadlineDate = new Date(deadlineText.replace('До: ', '').replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1'));
            const currentDate = new Date();

            if (currentDate > deadlineDate) {
                deadlineElement.classList.add('overdue');
            }
        }
    });
});