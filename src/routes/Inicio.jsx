import icono from "../images/abeja.png"
import "../estilos/global.css"
import { Link } from "react-router-dom"

const Inicio = () => {
  return (
    <>
    <nav>
        <img src={icono} alt="" width={"55px"} />
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
        <div className="seccionurl">
            <h2>Introduce tu URL</h2>
            <form className="formurl1" action="submit">
                <input className="input1" type="text" placeholder="Ejemplo: https://google.com" />
                <button className="button1">Acortar URL</button>
            </form>
        </div>
    </main>
    </>
  )
}

export default Inicio
