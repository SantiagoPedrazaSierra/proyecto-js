document.addEventListener("DOMContentLoaded", () => {
    const formBusqueda = document.querySelector("#search-button");
    const inputBusqueda = document.querySelector("#country-search");
    const contenedorInfo = document.querySelector("#pais-info");

    formBusqueda.addEventListener("click", async (event) => {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        const nombrePais = inputBusqueda.value.trim(); // Obtener el valor de la búsqueda
        contenedorInfo.innerHTML = ""; // Limpiar la sección de información

        // Verificar si hay un país escrito en el input
        if (!nombrePais) {
            contenedorInfo.innerHTML = `<p class="error">❌ Por favor, escribe un país para buscar.</p>`;
            return;
        }

        // URL para hacer la solicitud a la API
        const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(nombrePais)}?fullText=true&fields=name,capital,currencies,population`;

        try {
            // Realizar la solicitud a la API
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("País no encontrado.");
            }

            const data = await response.json();

            // Si no se encuentra el país, mostrar un mensaje de error
            if (!data[0]) {
                contenedorInfo.innerHTML = `<p class="error">⚠️ País no encontrado.</p>`;
                return;
            }

            const pais = data[0];
            const nombre = pais.name.common;
            const capital = pais.capital ? pais.capital[0] : "No disponible";
            const poblacion = pais.population.toLocaleString();
            const monedas = pais.currencies;

            let listaMonedas = [];
            for (const codigo in monedas) {
                const moneda = monedas[codigo];
                listaMonedas.push(`${moneda.name} (${codigo}) ${moneda.symbol || ''}`);
            }

            // Mostrar en la página
            contenedorInfo.innerHTML = `
                <article class="pais">
                    <h3>${nombre}</h3>
                    <p>Capital: ${capital}</p>
                    <p>Moneda: ${listaMonedas.join(', ')}</p>
                    <p>Población: ${poblacion}</p>
                </article>
            `;

            // Crear un objeto para la búsqueda
            const nuevaBusqueda = {
                id: Date.now(), // Usamos la fecha actual como ID único
                nombre,
                capital,
                moneda: listaMonedas.join(', '),
                poblacion
            };

            // Recuperar historial de búsquedas desde localStorage
            let historial = JSON.parse(localStorage.getItem("busquedas")) || [];

            // Evitar duplicados en el historial
            if (!historial.some(busqueda => busqueda.id === nuevaBusqueda.id)) {
                historial.push(nuevaBusqueda);
                localStorage.setItem("busquedas", JSON.stringify(historial));
            }

        } catch (error) {
            contenedorInfo.innerHTML = `<p class="error">⚠️ ${error.message}</p>`;
        }
    });
});
