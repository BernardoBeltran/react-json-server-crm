import { Form, useNavigate, redirect } from "react-router-dom";
import { eliminarCliente } from "../data/clientes";

// action para eliminar un cliente
export async function action({ params }) {
    // Ejecutamos la función eliminarCliente y pasamos como argumento el ID
    await eliminarCliente(params.clienteId);
    return redirect("/");
}

const Cliente = ({ cliente }) => {
    const navigate = useNavigate();
    const { nombre, empresa, email, telefono, id } = cliente;

    return (
        <tr className="border-b">
            <td className="p-6 space-y-2">
                <p className="text-2xl text-gray-800">{nombre}</p>
                <p>{empresa}</p>
            </td>
            <td className="p-6">
                <p className="text-gray-600">
                    <span className="text-gray-800 uppercase font-bold">
                        Email:{" "}
                    </span>
                    {email}
                </p>
                <p className="text-gray-600">
                    <span className="text-gray-800 uppercase font-bold">
                        Teléfono:{" "}
                    </span>
                    {telefono}
                </p>
            </td>
            <td className="p-6 flex gap-3">
                <button
                    type="button"
                    className="text-blue-600 hover:text-blue-700 uppercase font-bold text-xs"
                    onClick={() => navigate(`/clientes/${id}/editar`)}
                >
                    Editar
                </button>
                <Form
                    method="post"
                    action={`/clientes/${id}/eliminar`}
                    onSubmit={(e) => {
                        /**
                         * Evaluamos la ventana de confirmación, si es false previene
                         * el comportamiento por defecto, caso contrario, ejecuta el
                         * action que elimina el registro
                         */

                        if (!confirm("Desear eliminar este registro")) {
                            e.preventDefault();
                        }
                    }}
                >
                    <button
                        type="submit"
                        className="text-red-600 hover:text-red-700 uppercase font-bold text-xs"
                    >
                        Eliminar
                    </button>
                </Form>
            </td>
        </tr>
    );
};

export default Cliente;
