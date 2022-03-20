import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom' //1.sirve para leer los parametros enviados como el id
import Spinner  from '../components/Spinner' //x.importamos para añadir un spinner.<Spinner/>

const VerCliente = () => {
    
    const [cliente, setCliente] = useState({}) //objeto vacio
    const [cargando, setCargando] = useState(false) //1..evita q parpadee cuando cargue la pagina
    const {id} = useParams()  //2.traemos parametros nueva variable dnd alamacena en este caso el id
    //console.log(id) .. podemos ver que imprimirá el id recibido

    useEffect(() => {
        setCargando(!cargando) //2..es igual a poner setCargando(true) cambiamos el estado.
        const verClienteApi = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}` //template string para q sea de forma dinamica
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setCliente(resultado)
            } catch (error) {
                console.log(error)
            }
            setCargando(false) 
        }
        verClienteApi() //ejecutamos esta funcion creada
    }, [])

    return (
    //Cuando se agrega esta condicional, aparece el <p> x un pequeño tiempo luego se muestra el <div>. 
    cargando ? <Spinner/> : Object.keys(cliente).length === 0 ? <p>No hay Resultados</p> : (
        <div>
            
            <h1 className='font-black text-4xl text-blue-900'>Ver Cliente: {cliente.nombre}</h1>
            <p className='mt-3'>Informacion del cliente</p>

            <p className='text-4xl text-gray-600 mt-10'><span className='text-gray-800 font-bold uppercase'>Cliente: </span>{cliente.nombre}</p>
            <p className='text-2xl text-gray-600 mt-4'><span className='text-gray-800 font-bold uppercase'>Email: </span>{cliente.email}</p>
            {cliente.telefono && (
                <p className='text-2xl text-gray-600 mt-4'><span className='text-gray-800 font-bold uppercase'>Teléfono: </span>{cliente.telefono}</p>
            )}
            <p className='text-2xl text-gray-600 mt-4'><span className='text-gray-800 font-bold uppercase'>Empresa: </span>{cliente.empresa}</p>
            {cliente.notas && (//si existe notas se muestra lo sgt:
                <p className='text-2xl text-gray-600 mt-4'><span className='text-gray-800 font-bold uppercase'>Notas: </span>{cliente.notas}</p>
            )}
                
        </div>
        )
    )
}

export default VerCliente
