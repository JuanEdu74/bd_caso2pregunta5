document.addEventListener("DOMContentLoaded", function () {
    var carousel = document.getElementById("carouselHero");
    var descriptionBox = document.getElementById("carouselDescription");

    carousel.addEventListener("slid.bs.carousel", function (event) {
        var activeItem = event.relatedTarget; // Obtiene el slide activo
        var newDescription = activeItem.getAttribute("data-description"); // Extrae la descripción
        descriptionBox.textContent = newDescription; // Actualiza el texto
    });
});
