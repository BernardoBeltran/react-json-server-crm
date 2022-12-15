// Función async para obtener clientes desde la API local
export async function obtenerClientes() {
    // Realizamos la petición fetch hacia la ruta establecida en las variables de entorno
    const respuesta = await fetch(import.meta.env.VITE_API_URL);
    const resultado = await respuesta.json();

    return resultado;
}

// Función async para obtener UN CLIENTE desde la API local
export async function obtenerCliente(id) {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
    const resultado = await respuesta.json();

    return resultado;
}

// Función para agregar un nuevo cliente a la API local
export async function agregarCliente(datos) {
    try {
        const respuesta = await fetch(import.meta.env.VITE_API_URL, {
            method: "POST",
            body: JSON.stringify(datos),
            headers: { "Content-Type": "application/json" },
        });

        await respuesta.json();
    } catch (error) {
        console.log(error);
    }
}

// Función para actualizar un cliente
export async function actualizarCliente(id, datos) {
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: "PUT",
            body: JSON.stringify(datos),
            headers: { "Content-Type": "application/json" },
        });

        await respuesta.json();
    } catch (error) {
        console.log(error);
    }
}

// Función para eliminar un cliente
export async function eliminarCliente(id) {
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: "DELETE",
        });

        await respuesta.json();
    } catch (error) {
        console.log(error);
    }
}
