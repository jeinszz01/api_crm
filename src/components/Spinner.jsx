import '../styles/Spinner.css'
//para añadir un spinner a nuesto sitio web
//obtenemos el css y lo guardamos en src/styles
//el html en este componente luego del return, y lo importamos en la pag q qerramos.

const Spinner = () => {
    return (
        <div className="sk-chase">
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
        </div>
    )
}

export default Spinner
