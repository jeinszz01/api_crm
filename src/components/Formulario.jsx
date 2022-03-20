import React from 'react'
import { Formik, Form, Field } from 'Formik'
//Formik libreria para formularios, npm i formik yup,
import { useNavigate } from 'react-router-dom' //sirve para redireccionar de una pag a otra.
import * as Yup from 'yup' //para crear validaciones.
import Alerta from './Alerta'
import Spinner from './Spinner'


const Formulario = ({cliente, cargando}) => {
    
    const navigate = useNavigate()

    //Creamos un Schema, shape es la forma como vamos a crear los datos.
    //Reaizamos las validaciones respectivas.
    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string().min(3,'El Nombre es muy corto').max(20,'El nombre es muy largo').required('El Nombre del Cliente debe ser Obligatorio'),
        empresa: Yup.string().required('El nombre de la Empresa es Obigatorio'),
        email: Yup.string().email('Email no válido').required('El email es obligatorio'),
        telefono: Yup.number().positive('Número no válido').integer('Número no válido').typeError('El número no es válido')
    })
    
    //recibimos los values con valores, y ya podemos usarlos o imprimirlos.
    //es una funcion asincrona para usar try catch (para capturar errores)
    const handleSubmit = async (valores) => {
        try {
            let respuesta //una ves se cree la variable respuesta realizará la comparación del if o else.
            if(cliente.id) {//if else, nos sirve para ver si estamos editando o creando un nuevo cliente.
                //Editando un registro.
                const url = `http://localhost:4000/clientes/${cliente.id}`
                //Primero enviaremos la petision a esta url. clientes es igual a la db.s
                respuesta = await fetch(url, {
                    method: 'PUT', //PUT para editar o actualizar.
                    body: JSON.stringify(valores), //pasamos el objeto en forma de string
                    headers: {
                        'Content-Type' : 'application/json'
                    }//cabeceras
                })
            } else { //Esta sección nos permite crear un nuevo registro.
                const url = 'http://localhost:4000/clientes'
                //Primero enviaremos la petision a esta url. clientes es igual a la db.s
                //await fetch para blockear el codigo xq no se sabe el tiempo q tomara la creacion del nuregistro
                //Cuando se crea, elimina o actualiza el fetch(url,{se pasa la config d la informacion aqui})
                respuesta = await fetch(url, {
                    method: 'POST', //por default es GET.
                    body: JSON.stringify(valores), //pasamos el objeto en forma de string
                    headers: {
                        'Content-Type' : 'application/json'
                    }//necesario debido a q cada API tiene sus reglas y la configuracion es tipo Json-server
                    //aqui tambien en el header se autentifica el usuario.
                })
            }
            //const resultado = aw resp.json() //una vez se ejecute va navegar a clientes.
            await respuesta.json()
            //una vez ejecutado todo el codigo para guardar un objeto(cliente), redireccionaremos con:
            navigate('/clientes')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        //si existe cargando o esta como true se ejecuta <Spinner/> 
        cargando ? <Spinner /> : (
            <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>

                <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>
                    {cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                </h1>
                {/* En lugar de crear un form creamos un Formik */}
                <Formik
                    initialValues={{
                        nombre: cliente?.nombre ?? '',//similar a un ternario o condicional, verifica si cliente.nombre existe
                        empresa:cliente?.empresa ?? '', //si existe se imprime el nombre en este caso, si no existe inicia como string basio
                        email:cliente?.email ?? '', //es decir si marca undefined q agrege "", pero si es correcto agrega el nombre.
                        telefono:cliente?.telefono ?? '', //Pero como se esta compartiendo el Formulario de agregar y editar
                        notas:cliente?.notas ?? ''//saldra error cuando se agregue. para esto creamos lo sgt(*)
                        //ternario= cliente.nombre ? cliente.nombre : "".
                    }} //valores de inicio del formulario x elemento. initialValues obtiene los valores.
                    //en la variable values se esta almacenando lo de initialValues.
                    onSubmit={ async (values, {resetForm}) => {
                        await handleSubmit(values)
                        //Hacemos que dentro de la funcion (,)=>{} await hanSub se complete para luego ejec resForm 
                        resetForm()
                    }}//enviamos a traves de la funcion handleS los values q equivalen a los parametros de iniValues
                    validationSchema={nuevoClienteSchema}
                    enableReinitialize={true} //atributo de Formik q x defaul es false, al ser true ya toma valores en ivalues.
                                            //llena el texbox al cargar.
                >
                    {({errors, touched}) => {
                        
                    return(

                    <Form className='mt-10'>
                        
                        <div className='mb-4'>
                            <label className='text-gray-800' htmlFor='nombre'>Nombre:</label>
                            <Field id='nombre' name='nombre' type='text' className='mt-2 block w-full p-3 bg-gray-50' placeholder='Nombre del Cliente' />
                            {errors.nombre && touched.nombre ? (
                                <Alerta>{errors.nombre}</Alerta>
                            ) : null }
                        </div>{/*validacion para mostrar mensajes de error.*/}
                        
                        <div className='mb-4'>
                            <label className='text-gray-800' htmlFor='empresa'>Empresa:</label>
                            <Field id='empresa' name='empresa' type='text' className='mt-2 block w-full p-3 bg-gray-50' placeholder='Empresa del Cliente' />
                            {errors.empresa && touched.empresa ? (
                                <Alerta>{errors.empresa}</Alerta>
                            ) : null }
                        </div>

                        <div className='mb-4'>
                            <label className='text-gray-800' htmlFor='email'>E-mail:</label>
                            <Field id='email' name='email' type='email' className='mt-2 block w-full p-3 bg-gray-50' placeholder='Email del Cliente' />
                            {errors.email && touched.email ? (
                                <Alerta>{errors.email}</Alerta>//a través de errors obtenemos atributos.
                            ) : null }
                        </div>

                        <div className='mb-4'>
                            <label className='text-gray-800' htmlFor='telefono'>Teléfono:</label>
                            <Field id='telefono' name='telefono' type='tel' className='mt-2 block w-full p-3 bg-gray-50' placeholder='Teléfono del Cliente' />
                            {errors.telefono && touched.telefono ? (
                                <Alerta>{errors.telefono}</Alerta>
                            ) : null }
                        </div>

                        <div className='mb-4'>
                            <label className='text-gray-800' htmlFor='notas'>Notas:</label>
                            <Field id='notas' name='notas' type='text' as='textarea' className='mt-2 block w-full p-3 bg-gray-50 h-40' placeholder='Notas del Cliente' />
                        </div>

                        <input type='submit' value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'} className='mt-5 w-full bg-blue-800 hover:bg-blue-900 p-3 text-white uppercase font-bold text-lg' />

                    </Form>
                    )}}
                </Formik>

            </div>
        )
    )
}
//(*) defaultProps: (nombre del componente en este caso Formulario).defaultProps el cual será un objeto
// toma los props que se estan recibiendo pero si no existen no se ejecuta, como una condicional.
// para cargando, si no esta presente cargando: va ser false y la variable seguirá existiendo.
Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario
