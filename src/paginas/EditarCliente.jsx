import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Formulario from '../components/Formulario'

const EditarCliente = () => {

    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(false) 
    const {id} = useParams()

    //este useEffect hace la consulta a nustra API.
    useEffect(() => {
        setCargando(!cargando)
        const verClienteApi = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`
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
        <>
            <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
            <p className='mt-3'>Utiliza este formulario para editar datos de un cliente</p>
            
            { cliente?.nombre ? <Formulario cliente={cliente} cargando={cargando} /> : 'Cliente ID no válido.' }
            {/* { cliente?.nombre && (<Formulario cliente={cliente} cargando={cargando} />) } */}
        </>// Si se cumple cliente?.nombre se ejecuta lo siguiente. Funcionalidad del &&. similar a un ternario.
    )
}

export default EditarCliente
