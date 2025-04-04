document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Previene que se recargue la página

    let conteo = { A: 0, B: 0, C: 0 };
    let nombreIngresado = "";
    nombreIngresado = document.getElementById("nombre").value;
    localStorage.setItem("nombreUsuario", nombreIngresado);
    let nombreGuardado = localStorage.getItem("nombreUsuario");

    const opcionesSeleccionadas = document.querySelectorAll('input[type="radio"]:checked');
    opcionesSeleccionadas.forEach(opcion => {
        conteo[opcion.value]++;
    });

    let textoResultado = averiguarColor(conteo);

    let mostrarResultado = document.createElement('DIV');
    mostrarResultado.innerHTML = `<p>${textoResultado}</p>`;
    const contenedor = document.getElementById("contactoContainer");
    contenedor.appendChild(mostrarResultado);
    mostrarResultado.className = "resultado"

    document.getElementById("botonEnviar").disabled = true;

});

function averiguarColor(conteo) {
    let calido = conteo.A, frio = conteo.B, neutro = conteo.C;

    if (calido > frio && calido > neutro) {
        return "Tu colorimetría es cálida!";
    } else if (frio > calido && frio > neutro) {
        return "Tu colorimetría es fría!";
    } else if (neutro > calido && neutro > frio) {
        return "Tu colorimetría es neutra!";
    } else {
        return "No se puede determinar claramente tu colorimetría.";
    }
}
