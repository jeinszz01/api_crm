import { useState, useEffect } from 'react'
import Cliente from '../components/Cliente'

const Inicio = () => {
    //En general primero creamos nuestra API (db) en dnd estamos guardando nuestros registros
    //a su ves creamos un State (DOM) para almacenar los clientes y mostrarlos en pantalla.
    //si quisieramos eliminar un cliente deberiamos eliminar tanto del state como de nuestra API.
    const [clientes, setClientes] = useState([]) //arreglo vacio xq seran multiples clientes
    
    const obtenerClientesApi = async () => { //Con esto obtenemos los clientes de la db o API.
        try {
            const url = 'http://localhost:4000/clientes'
            const respuesta = await fetch(url)  //como es una peticion osea GET solo ponemos la url
            const resultado = await respuesta.json()

            setClientes(resultado)  //llenamos a setClientes los clientes ya ingresados a la db.
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() =>{
        obtenerClientesApi() //se ejecuta una vez [] para actualizar el state, obtenemos de esta manera los clientes.
    }, [])

    //Eliminando un registro. (*)
    const handleEliminar = async id => { //el id viene de <Cliente/> > onClick > handleEliminar(id)
        const confirmar = confirm('Deseas eliminar este Cliente? :(')
        //confirm es un cuadro de diálogo dnd obtiene true o false.
        if(confirmar){
            try {
                const url = `http://localhost:4000/clientes/${id}`
                const respuesta = await fetch(url, { method: 'DELETE' })
            //no se pone el body xq solo se necesita el id para eliminar.
                await respuesta.json()
                //location.reload()// hace que vuelva a recargar la página, pero no es un buen peformance.
                //hacemos esto para q se recargue la pag y vuelva a consultar el API ya q el state aun contiene info.
                //*const arrayClientes = clientes.filter(cliente => cliente.id !== id)
                // el filter te trae un nuevo arreglo mas no te lo muta o edita el existente.
                // cliente es para acceder a cada cliente de forma individual de todos los clientes q hay.
                // id es el id q viene de la función. (handleEli) el cual viene a su vez de <Cliente/>
                // !== nos trae a tdos los clientes menos al que estoy seleccionando x el id.
                //*setClientes(arrayClientes)
                await obtenerClientesApi() // obtenemos los clientes luego de eliminar alguno.
            } catch (error) {
                console.log(error)
            }
        } else {

        }
    }//como es solo un parametro (id) puede ir sin parentesis.

    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
            <p className='mt-3'>Administra tus Clientes</p>

            <table className='w-full mt-5 table-auto shadow bg-white'>
                <thead className='bg-blue-800 text-white'>
                    <tr>
                        <th className='p-2'>Nombre</th>
                        <th className='p-2'>Contacto</th>
                        <th className='p-2'>Empresa</th>
                        <th className='p-2'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (//variable temporal nueva 'cliente'
                        <Cliente key={cliente.id} cliente={cliente} handleEliminar={handleEliminar}/>
                    ))}
                </tbody>

            </table>

        </>
    )
}

export default Inicio
