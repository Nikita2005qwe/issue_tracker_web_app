document.addEventListener('DOMContentLoaded', function () {
    const taskDeadlines = document.querySelectorAll('.task-deadline');

    taskDeadlines.forEach(deadlineElement => {
        const deadlineISO = deadlineElement.getAttribute('data-deadline');

        if (!deadlineISO) return; // Если срок не установлен, ничего не делаем

        const deadlineDate = new Date(deadlineISO);
        const currentDate = new Date();

        if (currentDate > deadlineDate) {
            // Просрочено
            deadlineElement.classList.add('overdue');
            deadlineElement.textContent = 'Просрочено';
        } else {
            // Рассчитываем оставшееся время
            const diffMs = deadlineDate - currentDate;
            const diffMinutes = Math.floor(diffMs / (1000 * 60));
            const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

            let remainingText = '';
            if (diffMinutes < 60) {
                remainingText = `${diffMinutes} мин.`;
            } else if (diffHours < 24) {
                remainingText = `${diffHours} ч.`;
            } else {
                remainingText = `до ${deadlineDate.toLocaleDateString()}`;
            }

            deadlineElement.textContent = `Осталось: ${remainingText}`;
        }
    });
});