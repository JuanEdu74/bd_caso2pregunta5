let carrito = []; // Array para almacenar los productos
let platilloTemporal = { nombre: "", precio: 0 };

// Función para actualizar el carrito en la interfaz
function actualizarCarrito() {
    let totalCarrito = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    document.getElementById("cart-total").textContent = `S/ ${totalCarrito.toFixed(2)}`;
}

// Función para mostrar el modal de confirmación con el platillo seleccionado
function confirmarCompra(nombre, precio) {
    platilloTemporal = { nombre, precio };
    document.getElementById("confirmacion-texto").textContent = `Estás comprando "${nombre}" por S/ ${precio.toFixed(2)}.`;
    
    let modal = new bootstrap.Modal(document.getElementById("confirmModal"));
    modal.show();
}

// Función para agregar el platillo al carrito
function comprar() {
    let itemIndex = carrito.findIndex(item => item.nombre === platilloTemporal.nombre);
    
    if (itemIndex !== -1) {
        carrito[itemIndex].cantidad++;
    } else {
        carrito.push({ ...platilloTemporal, cantidad: 1 });
    }
    
    actualizarCarrito();

    // Mostrar mensaje de éxito
    document.getElementById("mensaje-exito").textContent = `"${platilloTemporal.nombre}" ha sido añadido al carrito.`;
    let successModal = new bootstrap.Modal(document.getElementById("successModal"));
    successModal.show();

    // Cerrar el modal de confirmación
    let confirmModal = bootstrap.Modal.getInstance(document.getElementById("confirmModal"));
    confirmModal.hide();
}

// Función para mostrar los platillos comprados al hacer clic en el carrito
function mostrarCarrito() {
    let listaCarrito = document.getElementById("carrito-lista");
    let totalGeneral = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<li>No hay productos en el carrito.</li>";
    } else {
        carrito.forEach(item => {
            let li = document.createElement("li");
            li.textContent = `${item.nombre} x${item.cantidad} - S/ ${item.precio.toFixed(2)} c/u | Total: S/ ${(item.precio * item.cantidad).toFixed(2)}`;
            listaCarrito.appendChild(li);
        });
    }
    
    document.getElementById("carrito-total").textContent = `Total: S/ ${totalGeneral.toFixed(2)}`;

    let modal = new bootstrap.Modal(document.getElementById("carritoModal"));
    modal.show();
}


// Función para vaciar el carrito
function vaciarCarrito() {
    // Vaciar el array del carrito
    carrito = [];

    // Actualizar la interfaz
    actualizarCarrito();

    // Mostrar un mensaje de confirmación
    let modal = new bootstrap.Modal(document.getElementById("successModal"));
    document.getElementById("mensaje-exito").textContent = "El carrito ha sido vaciado.";
    modal.show();
}

// Función para enviar el pedido a Whatsapp
function enviarPedidoWhatsApp() {
    let telefono = "51955786062"; // Número de WhatsApp

    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de enviar el pedido.");
        return;
    }

    let mensaje = "Hola, quiero hacer un pedido. Aquí está mi carrito:\n\n";
    let totalGeneral = 0;

    carrito.forEach((item, index) => {
        let subtotal = item.precio * item.cantidad;
        totalGeneral += subtotal;
        mensaje += `${index + 1}. ${item.nombre} - ${item.cantidad}x S/ ${item.precio.toFixed(2)} = S/ ${subtotal.toFixed(2)}\n`;
    });

    mensaje += `\nTotal a pagar: S/ ${totalGeneral.toFixed(2)}\n\n`;
    mensaje += "*Chifería Arellano - Gracias por su preferencia* :)";

    // Convertir mensaje a formato URL
    let url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    // Redirigir a WhatsApp
    window.open(url, "_blank");
}



// Cargar el carrito al iniciar
document.addEventListener("DOMContentLoaded", actualizarCarrito);
