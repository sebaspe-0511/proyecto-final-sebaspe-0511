document.addEventListener("DOMContentLoaded", () => {
    cargarPeliculas();
});

function cargarPeliculas() {
    fetch("/api/cartelera")
        .then(respuesta => respuesta.json())
        .then(datos => {
            mostrarPeliculasEnHTML(datos.peliculas);
        })
        .catch(error => console.error("Error al cargar el JSON:", error));
}

function mostrarPeliculasEnHTML(listaDePeliculas) {
    const contenedor = document.getElementById("contenedor-cartelera");
    listaDePeliculas.forEach(pelicula => {
        const tarjetaHtml = `
            <article class="tarjeta-pelicula" onclick="seleccionarPelicula(${pelicula.id})">
                <img src="${pelicula.imagen}" alt="${pelicula.titulo}" class="imagen-pelicula">
                <div class="info-pelicula">
                    <h2 class="titulo-pelicula">${pelicula.titulo}</h2>
                    <p class="detalles-pelicula">${pelicula.genero} — ${pelicula.año}</p>
                </div>
            </article>
        `;
        contenedor.innerHTML += tarjetaHtml;
    });
}

function seleccionarPelicula(idPelicula) {
    localStorage.setItem("peliculaSeleccionada", idPelicula);
    window.location.href = "Funciones.html";
}