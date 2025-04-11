document.addEventListener("DOMContentLoaded", () => {
    const historialContenedor = document.querySelector("#historial-list")

    // Funcion para mostrar el historial de busqueda
    function mostrarHistorial() {
        const historial = JSON.parse(localStorage.getItem("busquedas")) || []
        historialContenedor.innerHTML = "" // Limpia historial previo

        if (historial.length === 0) {

            historialContenedor.innerHTML = "<p>No hay busquedas previas.</p>"
            return
        }
        // Crear una lista del historial
        historial.forEach(item => {
            const li = document.createElement("li")
            li.innerHTML = `
        <strong>${item.nombre}</strong>
        Capital: ${item.capital}
        Moneda: ${item.moneda}
        Poblacion: ${item.poblacion}
        <button class="eliminar" data-id="${item.id}">Eliminar</button>
        `
        historialContenedor.appendChild(li)
        })
    }
})
