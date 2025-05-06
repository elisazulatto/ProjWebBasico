import servicios from "./Servicios.js";

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function actualizarCarrito() {
    const contador = document.getElementById("contadorCarrito");
    if (contador) {
        contador.textContent = carrito.length;
    }

    mostrarCarrito();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

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

function mostrarCarrito() {
    const carritoContainer = document.getElementById("carritoContainer");
    if (!carritoContainer) return;

    carritoContainer.innerHTML = "";
    carrito.forEach((servicio) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <img src="${servicio.imagen}" alt="${servicio.nombre}">
            <h3>${servicio.nombre}</h3>
            <p>${servicio.descripcion}</p>
            <p>Precio: $${servicio.precio}</p>
        
        `;
        carritoContainer.appendChild(div);
    });
}


function mostrarCarritoDeReservas() {
    const carritoDeReservas = document.getElementById("carritoDeReservas");
    if (!carritoDeReservas) return;

    carritoDeReservas.innerHTML = "";
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];


    carritoGuardado.forEach(servicio => {
        const div = document.createElement("div");
        div.innerHTML = `
            <img src="${servicio.imagen}" alt="${servicio.nombre}" style="width: 100px;">
            <h3>${servicio.nombre}</h3>
            <p>${servicio.descripcion}</p>
            <p>Precio: $${servicio.precio}</p>
            <button onclick="eliminarDelCarrito(${servicio.id})">Eliminar</button>
        `;
        carritoDeReservas.appendChild(div);
    });
}




window.agregarAlCarrito = function (id) {
    const servicio = servicios.find(servicio => servicio.id === id);
    if (servicio) {
        carrito.push(servicio);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        const contador = document.getElementById("contadorCarrito");
        contador.textContent = carrito.length;
        mostrarCarritoDeReservas();
    }
};

window.eliminarDelCarrito = function (id) {
    localStorage.removeItem(carrito.id);
    mostrarCarritoDeReservas();
};

window.limpiarCarrito = function (id) {
    localStorage.removeItem("carrito");
    location.reload();
}


addEventListener("DOMContentLoaded", () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const carritoContainer = document.getElementById("carritoDeReservas");

    if (carrito.length === 0) {
        carritoContainer.innerHTML = "<p>No hay productos en el carrito.</p>";
        return;
    }

    carrito.forEach(servicio => {
        const div = document.createElement("div");
        div.innerHTML = `
            <h3>${servicio.nombre}</h3>
            <p>Precio: $${servicio.precio}</p>
        `;
        carritoContainer.appendChild(div);
    });
});

mostrarServicios(servicios);
actualizarCarrito();