document.addEventListener("DOMContentLoaded", () => {
    cargarResumenCompra();
    manejarFormulario();
});

function cargarResumenCompra() {
    const idPelicula = localStorage.getItem("peliculaSeleccionada");
    const fecha = localStorage.getItem("fechaSeleccionada");
    const hora = localStorage.getItem("horaSeleccionada");
    const total = localStorage.getItem("totalAPagar");
    const asientos = JSON.parse(localStorage.getItem("asientosFinales"));

    document.getElementById("pago-total").textContent = "$" + total;
    document.getElementById("pago-fecha-hora").textContent = `${hora} • ${fecha}`;
    document.getElementById("pago-asientos").textContent = asientos.join(", ");

    fetch("/api/cartelera")
        .then(respuesta => respuesta.json())
        .then(datos => {
            const pelicula = datos.peliculas.find(p => p.id == idPelicula);
            if (pelicula) {
                document.getElementById("pago-titulo").textContent = pelicula.titulo.toUpperCase();
            }
        });
}

function manejarFormulario() {
    const formulario = document.getElementById("formulario-pago");

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const nombreIngresado = document.getElementById("nombreCliente").value;
        localStorage.setItem("nombreCliente", nombreIngresado);

        window.location.href = "Entrada.html";
    });
}