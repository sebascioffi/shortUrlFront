import icono from "../images/abeja.png"
import "../estilos/global.css"
import { Link } from "react-router-dom"
import { useState } from "react";


const Inicio = () => {

    const [mostrarModal, setMostrarModal] = useState(false);

    const handleAcortarURL = (event) => {
        event.preventDefault()
        setMostrarModal(true);
    };

    const handleCerrarModal = () => {
        setMostrarModal(false);
    };

  return (
    <>
    <nav>
        <Link to={"/"}><img src={icono} alt="" width={"55px"} /></Link>
        <div className="usuario">
            <Link to="/login" className="paginar"><h4>Iniciar Sesión</h4></Link>
            <Link to="/logup" className="paginar"><h4>Registrarse</h4></Link>
        </div>
    </nav>
    <main>
        <div className="secciontitulo">
            <h1>Acorta direcciones URL</h1>
            <h1>Fácil y rápido!</h1>
        </div>
        <div className="adorno"></div>
        <div className="seccionurl inicio">
            <h2>Introduce tu URL</h2>
            <form className="formurl1" onSubmit={handleAcortarURL}>
                <input className="input1" type="text" placeholder="Ejemplo: https://google.com" />
                <button className="button1">Acortar URL</button>
            </form>
            {mostrarModal && (
                <div className="modal">
                    <div className="modal-contenido">
                        <span className="cerrar-modal" onClick={handleCerrarModal}>X</span> {/* Añade contenido al span */}
                        <h2>¿Tienes una cuenta?</h2>
                        <p>Para acortar URLs, por favor <Link className="modallink" to={"/login"}>inicia sesión</Link> o <Link className="modallink" to={"/logup"}>regístrate</Link>.</p>
                    </div>
                </div>
            )}
        </div>
    </main>
    </>
  )
}

export default Inicio
