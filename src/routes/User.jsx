import icono from "../images/abeja.png"
import "../estilos/global.css"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"


const User = () => {

    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        obtenerUsuario()
        refreshAccessToken()
      }, [])

    const signOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expiresIn');
    }

    const obtenerUsuario = async(event) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://shorturlback.onrender.com/api/v1/auth/protected', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            });
            const responseData = await response.json();
            console.log(responseData);
            
            if (responseData.error === "JWT expirado"){
                refreshAccessToken()
            }
            
            const emailUsuario = responseData.email
            setUserEmail(emailUsuario);   
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    }     

    const refreshAccessToken = async(event) => {
        try {
            const response = await fetch('https://shorturlback.onrender.com/api/v1/auth/refresh', {
                method: 'GET',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const responseData = await response.json();
            console.log(responseData);
                        
        } catch (error) {
            console.error('Error: ', error);
        }
    }    

  return (
    <>
    <nav>
        <img src={icono} alt="" width={"55px"} />
        <p className="paginar">{userEmail}</p>

        <Link to="/" className="paginar" onClick={signOut}><h4>Cerrar Sesión</h4></Link>
    </nav>
    <main>
        <div className="seccionurl user">
            <h2>Introduce tu URL</h2>
            <form className="formurl1" action="submit">
                <input className="input1" type="text" placeholder="Ejemplo: https://google.com" />
                <button className="button1">Acortar URL</button>
            </form>
        </div>
        <div className="tusdirecciones">
            <h2>Tus direcciones</h2>
            <div className="seccionejemplo">
            <div className="ejemplo">
                <h3>Ejemplo</h3>
            </div>
            <div className="botonesejemplo">
                <button className="button1 botonejemplo copiar">Copiar</button>
                <button className="button1 botonejemplo modificar">Modificar</button>
                <button className="button1 botonejemplo eliminar">Eliminar</button>
            </div>
            </div>
        </div>
    </main>
    </>
  )
}

export default User
