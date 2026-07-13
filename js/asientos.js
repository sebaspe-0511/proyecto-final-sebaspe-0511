const precioPorAsiento = 18.50;
let asientosSeleccionados = [];

document.addEventListener("DOMContentLoaded", () => {
    dibujarSala();
    cargarResumen();
});

function dibujarSala() {
    const contenedor = document.getElementById("contenedor-asientos");
    const letrasFilas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    letrasFilas.forEach(letra => {
        const divFila = document.createElement("div");
        divFila.className = "fila-asientos";

        const spanLetra = document.createElement("span");
        spanLetra.className = "letra-fila";
        spanLetra.textContent = letra;
        divFila.appendChild(spanLetra);

        for (let numero = 1; numero <= 8; numero++) {
            const asiento = document.createElement("div");
            asiento.className = "asiento";
            asiento.dataset.codigo = letra + numero;

            if (Math.random() < 0.2) {
                asiento.classList.add("ocupado");
            } else {
                asiento.onclick = () => hacerClicEnAsiento(asiento);
            }
            divFila.appendChild(asiento);
        }
        contenedor.appendChild(divFila);
    });
}

function hacerClicEnAsiento(asiento) {
    if (asiento.classList.contains("ocupado")) {
        return;
    }

    const codigo = asiento.dataset.codigo;

    if (asiento.classList.contains("seleccionado")) {
        asiento.classList.remove("seleccionado");
        asientosSeleccionados = asientosSeleccionados.filter(asientoGuardado => asientoGuardado !== codigo);
    }
    else {
        asiento.classList.add("seleccionado");
        asientosSeleccionados.push(codigo);
    }

    actualizarTotal();
}

function actualizarTotal() {
    const cantidad = asientosSeleccionados.length;
    const total = cantidad * precioPorAsiento;

    document.getElementById("precio-total").textContent = "$" + total.toFixed(2);
    const botonPagar = document.getElementById("boton-pagar");

    if (cantidad > 0) {
        botonPagar.classList.add("activo");
        botonPagar.disabled = false;
        localStorage.setItem("asientosFinales", JSON.stringify(asientosSeleccionados));
        localStorage.setItem("totalAPagar", total.toFixed(2));

        botonPagar.onclick = () => {
            window.location.href = "Pago.html";
        };
    } else {
        botonPagar.classList.remove("activo");
        botonPagar.disabled = true;
    }
}

function cargarResumen() {
    const fecha = localStorage.getItem("fechaSeleccionada") || "Hoy";
    const hora = localStorage.getItem("horaSeleccionada") || "00:00";

    document.getElementById("resumen-titulo").textContent = "Película Seleccionada";
    document.getElementById("resumen-detalles").textContent = `${hora} • ${fecha} • SALA 04`;
}