// Получаем элементы DOM
var modal = document.getElementById("modal");
var createSectionModal = document.getElementById("createSectionModal");
var deleteModal = document.getElementById("deleteModal");

var openModalButton = document.getElementById("openModalButton");
var openCreateSectionModalButton = document.getElementById("openCreateSectionModalButton");
var openDeleteModalButton = document.getElementById("openDeleteModalButton");

var closeButtons = document.querySelectorAll(".close");
var overlay = document.getElementById("overlay");

// Функция для открытия модального окна
function openModal(modalElement) {
    modalElement.style.display = "block";
    overlay.style.display = "block";
}

// Функция для закрытия модального окна
function closeModal(modalElement) {
    modalElement.style.display = "none";
    overlay.style.display = "none";
}

// Событие для открытия первого модального окна
openModalButton.addEventListener("click", function() {
    openModal(modal);
});

// Событие для открытия второго модального окна
openCreateSectionModalButton.addEventListener("click", function() {
    openModal(createSectionModal);
});

// Событие для открытия модального окна для удаления
//openDeleteModalButton.addEventListener("click", function() {
//    openModal(deleteModal);
//});

// Событие для закрытия модальных окон при нажатии на крестик
closeButtons.forEach(function(closeButton) {
    closeButton.addEventListener("click", function() {
        closeModal(modal);
        closeModal(createSectionModal);
        closeModal(deleteModal);
    });
});

// Событие для закрытия модальных окон при клике вне их области

