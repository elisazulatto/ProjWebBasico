let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

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
            <input type="button" value="Eliminar" onclick="eliminarDelCarrito(${servicio.id})">
        `;
        carritoDeReservas.appendChild(div);
    });
}

window.eliminarDelCarrito = function (id) {
    const index = carrito.findIndex(servicio => servicio.id === id);
    if (index !== -1) {
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarritoDeReservas();
    }
};


window.limpiarCarrito = function () {
    localStorage.removeItem("carrito");
    location.reload();
};

function actualizarCarrito() {
    const contador = document.getElementById("contadorCarrito");
    if (contador) {
        contador.textContent = carrito.length;
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

document.addEventListener("DOMContentLoaded", () => {
    const carritoDeReservas = document.getElementById("carritoDeReservas");

    if (carrito.length === 0) {
        carritoDeReservas.innerHTML = "<p>No hay productos en el carrito.</p>";
        return;
    }

    carrito.forEach(servicio => {
        const div = document.createElement("div");
        div.innerHTML = `
            <h3>${servicio.nombre}</h3>
            <p>Precio: $${servicio.precio}</p>
        `;
        carritoDeReservas.appendChild(div);
    });


    mostrarCarritoDeReservas();
    actualizarCarrito();
});
