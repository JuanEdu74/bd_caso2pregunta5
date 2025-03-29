//CAROUSEL.JS

document.addEventListener("DOMContentLoaded", function () {
    var carousel = document.getElementById("carouselHero");
    var descriptionBox = document.getElementById("carouselDescription");

    carousel.addEventListener("slid.bs.carousel", function (event) {
        var activeItem = event.relatedTarget; // Obtiene el slide activo
        var newDescription = activeItem.getAttribute("data-description"); // Extrae la descripción
        descriptionBox.textContent = newDescription; // Actualiza el texto
    });
});


//PROMOCIONES ESPECIALES JS

document.addEventListener("DOMContentLoaded", function () {
    const promociones = {
        1: { dia: "Lunes", texto: "50% de descuento en Chaufa.", img: "images/promociones_especiales/lunes.png" },
        2: { dia: "Martes", texto: "50% de descuento en productos con huevo.", img: "images/promociones_especiales/martes.png" },
        3: { dia: "Miércoles", texto: "Doble porción de wantán frito gratis.", img: "images/promociones_especiales/miercoles.png" },
        4: { dia: "Jueves", texto: "Acumulación de puntos extra.", img: "images/promociones_especiales/jueves.png" },
        5: { dia: "Viernes", texto: "20% de descuento en platos que terminen en 'kay'.", img: "images/promociones_especiales/viernes.png" },
        6: { dia: "Sábado", texto: "Usa tus puntos para bajar hasta un 90% determinado.", img: "images/promociones_especiales/sabado.png" },
        0: { dia: "Domingo", texto: "10% de descuento si traes a comer a 5 o más personas.", img: "images/promociones_especiales/domingo.png" }
    };

    let hoy = new Date().getDay();
    let promo = promociones[hoy];

    if (promo) {
        document.getElementById("promo-day").textContent = "¡" + promo.dia + "!";
        document.getElementById("promo-text").textContent = promo.texto;
        let promoImg = document.getElementById("promo-img");

        // Verifica que la imagen exista antes de asignarla
        promoImg.onerror = function () {
            console.error("Imagen no encontrada:", promo.img);
            promoImg.src = "images/promociones_especiales/default.png"; // Imagen por defecto si no se encuentra
        };

        promoImg.src = promo.img;
    } else {
        console.error("No hay promoción para hoy.");
    }
});


