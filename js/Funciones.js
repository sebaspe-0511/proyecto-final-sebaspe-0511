let tieneFecha = false;
let tieneHora = false;

document.addEventListener("DOMContentLoaded", () => {
    cargarDetallesPelicula();
});

function cargarDetallesPelicula() {
    const idPelicula = localStorage.getItem("peliculaSeleccionada");

    if (!idPelicula) {
        window.location.href = "Cartelera.html";
        return;
    }

    fetch("/api/cartelera")
        .then(respuesta => respuesta.json())
        .then(datos => {
            const pelicula = datos.peliculas.find(p => p.id == idPelicula);
            if (pelicula) {
                mostrarDetalles(pelicula);
                mostrarFechas(pelicula.fechas);
                mostrarHorarios(pelicula.horarios);
            }
        })
        .catch(error => console.error("Error cargando detalles:", error));
}

function mostrarDetalles(pelicula) {
    const contenedor = document.getElementById("contenedor-detalles");
    contenedor.innerHTML = `
        <img src="${pelicula.imagen}" alt="${pelicula.titulo}" class="imagen-detalle">
        <h2 class="titulo-pelicula">${pelicula.titulo}</h2>
        <p class="sinopsis">${pelicula.sinopsis}</p>
        <br>
        <span class="detalles-pelicula border-box">${pelicula.genero}</span>
        <span class="detalles-pelicula border-box">${pelicula.duracion}</span>
    `;
}

function mostrarFechas(listaFechas) {
    const contenedor = document.getElementById("contenedor-fechas");
    listaFechas.forEach(fecha => {
        const divFila = document.createElement("div");
        divFila.className = "fila-fecha";
        divFila.innerHTML = `
            <span>${fecha}</span>
            <span class="icono-check">✓</span>
        `;
        divFila.onclick = () => seleccionarFecha(divFila, fecha);
        contenedor.appendChild(divFila);
    });
}

function seleccionarFecha(filaClickeada, fechaElegida) {
    const todasLasFechas = document.querySelectorAll(".fila-fecha");
    todasLasFechas.forEach(f => f.classList.remove("seleccionado"));

    filaClickeada.classList.add("seleccionado");
    localStorage.setItem("fechaSeleccionada", fechaElegida);

    tieneFecha = true;
    validarBotonRojo();
}

function mostrarHorarios(listaHorarios) {
    const contenedor = document.getElementById("contenedor-horarios");
    listaHorarios.forEach(hora => {
        const boton = document.createElement("button");
        boton.className = "boton-hora";
        boton.textContent = hora;
        boton.onclick = () => seleccionarHora(boton, hora);
        contenedor.appendChild(boton);
    });
}

function seleccionarHora(botonClickeado, horaElegida) {
    const todosLosBotones = document.querySelectorAll(".boton-hora");
    todosLosBotones.forEach(b => b.classList.remove("seleccionado"));

    botonClickeado.classList.add("seleccionado");
    localStorage.setItem("horaSeleccionada", horaElegida);

    tieneHora = true;
    validarBotonRojo();
}

function validarBotonRojo() {
    const botonRojo = document.getElementById("boton-seleccionar-asientos");
    if (tieneFecha && tieneHora) {
        botonRojo.disabled = false;
        botonRojo.onclick = () => {
            window.location.href = "Asientos.html";
        };
    }
}