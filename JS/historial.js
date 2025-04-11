document.addEventListener("DOMContentLoaded", () => {
    const historialContenedor = document.querySelector("#historial-list");

    // Mostrar historial al cargar la página
    mostrarHistorial();

    // Función para mostrar el historial de búsquedas
    function mostrarHistorial() {
        const historial = JSON.parse(localStorage.getItem("busquedas")) || [];
        historialContenedor.innerHTML = ""; // Limpiar historial previo

        if (historial.length === 0) {
        
            historialContenedor.innerHTML = "<p>No hay búsquedas previas.</p>";
            return;
        }

        // Crear una lista del historial
        historial.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${item.nombre}</strong><br>
                Capital: ${item.capital}<br>
                Moneda: ${item.moneda}<br>
                Población: ${item.poblacion}<br>
                <button class="eliminar" data-id="${item.id}">Eliminar</button>
            `;
            historialContenedor.appendChild(li);
        });

        // Agregar el event listener para los botones de eliminar
        const botonesEliminar = document.querySelectorAll(".eliminar");
        botonesEliminar.forEach(boton => {
            boton.addEventListener("click", eliminarBusqueda);
        });
    }

    // Función para eliminar una búsqueda del historial
    function eliminarBusqueda(event) {
        const idBusqueda = event.target.getAttribute("data-id");

        // Recuperar el historial desde localStorage
        let historial = JSON.parse(localStorage.getItem("busquedas")) || [];

        // Filtrar el historial para eliminar el país con el id correspondiente
        historial = historial.filter(busqueda => busqueda.id !== parseInt(idBusqueda));

        // Guardar el historial actualizado en localStorage
        localStorage.setItem("busquedas", JSON.stringify(historial));

        // Volver a mostrar el historial actualizado
        mostrarHistorial();
    }
});
    