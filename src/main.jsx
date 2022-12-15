import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import Layout from "./components/Layout";

import "./index.css";
import EditarCliente, {
    loader as editarClienteLoader,
    action as editarClienteAction,
} from "./pages/EditarCliente";
import Index, { loader as clientesLoader } from "./pages/Index";
import NuevoCliente, {
    action as nuevoClienteAction,
} from "./pages/NuevoCliente";
import { action as eliminarClienteAction } from "./components/Cliente";

// Definiendo las principales rutas de la aplicación
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Index />,
                //Asociamos el loader de clientes con <Index />
                loader: clientesLoader,
                // Elemento para manejo de errores
                errorElement: <ErrorPage />,
            },
            {
                path: "/clientes/nuevo",
                element: <NuevoCliente />,
                // Asociamos el action del formulario de nuevo cliente con <NuevoCliente />
                action: nuevoClienteAction,
                errorElement: <ErrorPage />,
            },
            {
                // Ruta dinámica que recibe el id del cliente
                path: "/clientes/:clienteId/editar",
                element: <EditarCliente />,
                loader: editarClienteLoader,
                action: editarClienteAction,
                errorElement: <ErrorPage />,
            },
            {
                path: "clientes/:clienteId/eliminar",
                action: eliminarClienteAction,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
