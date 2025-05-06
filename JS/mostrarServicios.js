let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let servicios = []; // ahora esta variable está disponible para todas las funciones

async function cargarServicios() {
    try {
        const respuesta = await fetch("./servicios.json");
        if (!respuesta.ok) throw new Error("No se pudo cargar el archivo servicios.json");
        const data = await respuesta.json();
        servicios = data.servicios; // asignás a la variable global

        const container = document.getElementById("serviciosContainer");
        if (!container) return;

        container.innerHTML = "";

        servicios.forEach(servicio => {
            const div = document.createElement("div");
            div.innerHTML = `
                <h3>${servicio.nombre}</h3>
                <img src="${servicio.imagen}" alt="${servicio.nombre}">
                <p>${servicio.descripcion}</p>
                <p>Precio: $${servicio.precio}</p>
                <button onclick="agregarAlCarrito(${servicio.id})">Quiero mi turno</button>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.error("Error al cargar servicios:", error);
    }
}

window.agregarAlCarrito = function (id) {
    const servicio = servicios.find(servicio => servicio.id === id);
    if (servicio) {
        carrito.push(servicio);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        const contador = document.getElementById("contadorCarrito");
        if (contador) contador.textContent = carrito.length;
    }
};

cargarServicios();
