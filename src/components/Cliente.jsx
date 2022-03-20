import { useNavigate } from 'react-router-dom' //1:para navegar paginas.

const Cliente = ({cliente, handleEliminar}) => {

    const navigate = useNavigate() //2:creamos funcion navigate.
    const { nombre, empresa, email, telefono, notas, id } = cliente

    return (
        //fila
        <tr className='border-b hover:bg-gray-50'>
            <td className='p-3'>{nombre}</td>
            <td className='p-3'>
                <p><span className='text-gray-800 font-bold uppercase'>Email: </span>{email}</p>
                <p><span className='text-gray-800 font-bold uppercase'>Tel: </span>{telefono}</p>
            </td>
            <td className='p-3'>{empresa}</td>
            <td className='p-3'>
                <button type='button' //3:arrowfunction navigate(ruta).
                        className='bg-yellow-500 hover:bg-yellow-600 block w-full text-white p-2 text-xs font-bold uppercase'
                        onClick={() => navigate(`/clientes/${id}`)}>Ver</button>
                <button type='button'
                        className='bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 text-xs font-bold uppercase mt-2'
                        onClick={() => navigate(`/clientes/editar/${id}`)}>Editar</button>
                <button type='button'
                        className='bg-red-600 hover:bg-red-700 block w-full text-white p-2 text-xs font-bold uppercase mt-2'
                        onClick={() => handleEliminar(id)}>Eliminar</button>
            </td>

        </tr>
        //1
    )
}

export default Cliente
