

// *INICIO DE NUEVO MODAL PARA PEDIR PEDIDO*


// Mostrar el modal al hacer clic en "Comprar Ahora"
document.getElementById("abrirModal").onclick = function() {
    $('#pedidoModal').modal('show');  // Abre el modal de Bootstrap
}

// Función para WhatsApp
document.getElementById("whatsappBtn").onclick = function() {
    const mensaje = "¡Hola! Estoy interesado en comprar el libro virtual de recetas de Chifería Arellano. ¿Podrías proporcionarme más información?";
    const numeroWhatsApp = "+51955786062";
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, "_blank");
    $('#pedidoModal').modal('hide');  // Cerrar modal después de hacer clic
};

// Evento de clic en el botón de "Comprar Ahora"
document.getElementById("pagoEfectivoBtn").onclick = function() {
    // Datos del pedido
    const orderData = {
        product_id: "001",  // ID único del producto
        amount: 25,  // Precio del libro
        description: "Libro Virtual de Recetas de Chifería Arellano",  // Descripción del producto
        currency: "PEN"  // Moneda, en este caso soles (PEN)
    };

    // Aquí realizamos la solicitud a PagoEfectivo para generar el CIP (Código de Identificación de Pago)
    $.ajax({
        url: "https://api.pagoefectivo.pe/v1/transaction/init",  // URL de la API para generar el CIP
        type: "POST",
        data: {
            merchantId: "TU_MERCHANT_ID",  // Tu ID de comerciante en PagoEfectivo
            amount: orderData.amount,
            description: orderData.description,
            currency: orderData.currency,
            productId: orderData.product_id,
        },
        success: function(response) {
            if(response.status === "success") {
                // Si la solicitud es exitosa, obtenemos el CIP
                const cipCode = response.cipCode;  // Este es el código CIP que el cliente debe pagar

                // Mostrar el código CIP y las instrucciones para realizar el pago
                alert("Genera tu código CIP: " + cipCode);
                
                // O puedes redirigir a una página de pago con las instrucciones del código CIP
                // Por ejemplo:
                window.location.href = "https://www.pagoefectivo.pe/consulta/" + cipCode;
            } else {
                alert("Hubo un error al generar el código CIP. Intenta nuevamente.");
            }
        },
        error: function() {
            alert("Error en la comunicación con el servidor de PagoEfectivo.");
        }
    });
};


// Cerrar el modal manualmente si el botón de cerrar no funciona
document.getElementById("cerrarModal").onclick = function() {
    $('#pedidoModal').modal('hide');  // Cerrar modal al hacer clic en el botón de cierre
};


// *FIN DE NUEVO MODAL PARA PEDIR PEDIDO*