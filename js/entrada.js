document.addEventListener("DOMContentLoaded", () => {
    cargarTicket();
});

function cargarTicket() {
    const idPelicula = localStorage.getItem("peliculaSeleccionada");
    const fecha = localStorage.getItem("fechaSeleccionada");
    const hora = localStorage.getItem("horaSeleccionada");
    const nombreUsuario = localStorage.getItem("nombreCliente") || "Cliente";

    const asientos = JSON.parse(localStorage.getItem("asientosFinales"));

    document.getElementById("mensaje-gracias").textContent = `¡Gracias por tu compra, ${nombreUsuario}!`;

    document.getElementById("ticket-fecha").textContent = fecha;
    document.getElementById("ticket-hora").textContent = hora;
    document.getElementById("ticket-asientos").textContent = asientos.join(", ");

    fetch("/api/cartelera")
        .then(respuesta => respuesta.json())
        .then(datos => {
            const pelicula = datos.peliculas.find(p => p.id == idPelicula);
            if (pelicula) {
                document.getElementById("ticket-titulo").textContent = pelicula.titulo.toUpperCase();
            }
        });
}

function volverInicio() {
    localStorage.clear();
    window.location.href = "Cartelera.html";
}