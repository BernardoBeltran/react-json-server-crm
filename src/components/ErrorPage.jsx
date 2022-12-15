import { useRouteError } from "react-router-dom";

// Componente personalizado para manejo de Errores
export default function ErrorPage() {
    // Usamos el Hook useRouteError y su propiedad 'message' para obtener el error
    const error = useRouteError();

    return (
        <div className="space-y-8">
            <h1 className="text center text-6xl font-extrabold mt-20 text-blue-900">
                ¡Ups! Algo salió mal
            </h1>
            <p className="text-center">Hubo un error</p>
            <p className="text-center">{error.statusText || error.message}</p>
        </div>
    );
}
