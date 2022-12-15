import {
    Form,
    redirect,
    useActionData,
    useLoaderData,
    useNavigate,
} from "react-router-dom";
import Error from "../components/Error";
import Formulario from "../components/Formulario";
import { actualizarCliente, obtenerCliente } from "../data/clientes";

// loader para obtener la información del cliente según su ID
export async function loader({ params }) {
    // Obtiene la infomación del cliente según su ID y la almacena en cliente
    const cliente = await obtenerCliente(params.clienteId);

    // Validamos si el objeto está vacío, creamos un objeto de respuesta personalizado
    if (Object.values(cliente).length === 0) {
        throw new Response("", {
            status: 404,
            statusText: "El cliente no fue encontrado",
        });
    }

    return cliente;
}

// action para actualizar un cliente
export async function action({ request, params }) {
    // Obtiene los datos del formulario enviado en la solicitud y los almacena
    // en una variable llamada "formData".
    const formData = await request.formData();

    // Convierte los datos del formulario en un objeto JavaScript y lo almacena
    // en una variable llamada "datos".
    const datos = Object.fromEntries(formData);

    // Obtiene el valor del campo de email del formulario y lo almacena en una
    // variable llamada "email".
    const email = formData.get("email");

    // Validación del Formulario
    const errores = [];

    if (Object.values(datos).includes("")) {
        errores.push("Todos los campos son obligatorios");
    }

    // Validando el campo de email
    let regex = new RegExp(
        "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
    );

    // Si la expresión regular no se cumple, añade nuevo error al arreglo errores
    if (!regex.test(email)) {
        errores.push("El email no es válido");
    }

    // Si hay errores, retorna el objeto con dichos errores
    if (Object.keys(errores).length) {
        return errores;
    }

    // Si el formulario no tiene problemas, actualiza el  cliente
    await actualizarCliente(params.clienteId, datos);

    // Por ultimo redirige el usuario hacia la ruta '/clientes'
    return redirect("/");
}

const EditarCliente = () => {
    const navigate = useNavigate();
    const cliente = useLoaderData();
    const errores = useActionData();

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">
                Editar Cliente
            </h1>
            <p className="mt-3">
                Edita la información del cliente en el siguiente formulario
            </p>

            <div className="flex justify-end">
                <button
                    className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
                    onClick={() => navigate("/")}
                >
                    Regresar
                </button>
            </div>

            {/* Formulario de registro de Nuevo Cliente */}
            <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
                {errores?.length &&
                    errores.map((error, i) => <Error key={i}>{error}</Error>)}

                <Form method="post" noValidate>
                    <Formulario cliente={cliente} />
                    <input
                        type="submit"
                        className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
                        value="Editar Cliente"
                    />
                </Form>
            </div>
        </>
    );
};

export default EditarCliente;
