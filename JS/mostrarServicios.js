import servicios from "./Servicios.js";

function mostrarServicios(servicios) {
    const container = document.getElementById("serviciosContainer");
    if (!container) return;

    container.innerHTML = "";

    servicios.forEach((servicio) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <img src="${servicio.imagen}" alt="${servicio.nombre}">
            <h3>${servicio.nombre}</h3>
            <p>${servicio.descripcion}</p>
            <p>Precio: $${servicio.precio}</p>
            <button onclick="agregarAlCarrito(${servicio.id})">Quiero mi turno</button>
        `;
        container.appendChild(div);
    });
}

// Inicializar
mostrarServicios(servicios); 