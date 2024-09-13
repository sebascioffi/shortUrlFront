import icono from "../images/abeja.png"
import enlace from "../images/enlace.png"
import "../estilos/global.css"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import refreshAccessToken from "../components/refreshAccessToken"


const User = () => {

    const [userEmail, setUserEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [errorsModificar, setErrorsModificar] = useState({});
    const [links, setLinks] = useState([]);
    const [modificarIndex, setModificarIndex] = useState(null)

    const port = process.env.REACT_APP_ORIGIN;

    const [formData, setFormData] = useState({
        longLink: '',
    });

    const [formDataModificar, setFormDataModificar] = useState({
        longLink: '',
    });

    useEffect(() => {
        obtenerUsuario()
        obtenerLinks()
    }, [])

    const signOut = () => {
        localStorage.removeItem('token');
    }

    const obtenerUsuario = async(event) => {
        try {
            const response = await fetch(`${port}/api/v1/auth/protected`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });
            const responseData = await response.json();
            console.log(responseData);
            
            if (responseData.error === "JWT expirado"){
                const newToken = await refreshAccessToken();
                localStorage.setItem("token", newToken);
            }
            
            const emailUsuario = responseData.email
            setUserEmail(emailUsuario);  
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    }      

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const handleInputChangeModificar = (event) => {
        const { name, value } = event.target;
        setFormDataModificar({ ...formDataModificar, [name]: value }); // Si el valor es vacío, usar defaultValue
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newToken = await refreshAccessToken();
        localStorage.setItem("token", newToken);
        try {
            const response = await fetch(`${port}/api/v1/links`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${newToken}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok){
                const errorData = await response.json()
                if (response.status === 500) {
                    setErrors(["Error de servidor"])
                }else{
                    const errorMessages = errorData.errors.map(error => error.msg);
                    setErrors(errorMessages);
                }
            }else{
                setErrors({})
                obtenerLinks()
                alert("Link acortado con éxito")
            }
            
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const obtenerLinks = async (event) => {
        try {
            const response = await fetch(`${port}/api/v1/links`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            const responseData = await response.json()

            const arrayLinks = responseData.links.map(elemento => ({
                    longLink: elemento.longLink,
                    nanoLink: elemento.nanoLink,
                    id: elemento._id.toString()
            }))

            setLinks(arrayLinks)
            
            } catch (error) {
                console.error("Error:", error);
            }
    }

    const removeLink = async (linkId) => {
        const newToken = await refreshAccessToken();
        localStorage.setItem("token", newToken);
        try {
            const response = await fetch(`${port}/api/v1/links/${linkId}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${newToken}`
                }
            });

            if (response.status === 500) {
                throw new Error("Error de servidor")
            }
            
            obtenerLinks()


            } catch (error) {
                console.error("Error:", error);
            }
    }

    const handleSubmitModificar = async(event, id) => {
        event.preventDefault();
        const newToken = await refreshAccessToken();
        localStorage.setItem("token", newToken);
        console.log(id);
        try {
            const response = await fetch(`${port}/api/v1/links/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${newToken}`
                },
                body: JSON.stringify(formDataModificar)
            });
            
            if (!response.ok){
                const errorData = await response.json()
                if (response.status === 500) {
                    setErrorsModificar(["Error de servidor"])
                }else{
                    const errorMessages = errorData.errors.map(error => error.msg);
                    setErrorsModificar(errorMessages);
                }
            }else{
                setErrorsModificar({})
                obtenerLinks()
                setModificarIndex(null)
                alert("Link modificado con éxito")
            }
            
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const handleCopyToClipboard = (texto) => {
        // Crear un elemento de input
        const input = document.createElement('input');
        // Establecer el valor del input como el texto que se va a copiar
        input.value = texto;
        // Agregar el input al DOM
        document.body.appendChild(input);
        // Seleccionar el contenido del input
        input.select();
        // Copiar el texto seleccionado al portapapeles
        document.execCommand('copy');
        // Eliminar el input del DOM
        document.body.removeChild(input);
    };

    const handleModificar = (index, link) => {
        if (modificarIndex !== null){
            setErrorsModificar({})
            setModificarIndex(null)
        }else{
            setErrorsModificar({})
            setModificarIndex(index) // Marcar que el usuario ha presionado el botón de modificar
            // Establecer el valor inicial del input como el longLink
            setFormDataModificar({ longLink: link });
        }
    };


  return (
    <>
    <nav>
        <img src={icono} alt="" width={"55px"} />
        <p className="paginar useremail">{userEmail}</p>
        <Link to="/" className="paginar" onClick={signOut}><h4>Cerrar Sesión</h4></Link>
    </nav>
    <main>
        <div className="seccionurl user">
            <h2>Introduce tu URL</h2>
            <form className="formurl1" onSubmit={handleSubmit}>
                <input className="input1" 
                type="text" 
                placeholder="Ejemplo: https://google.com" 
                name="longLink"
                value={formData.longLink}
                onChange={handleInputChange}
                />
                <button className="button1">Acortar URL</button>
            </form>
            {errors.length > 0 && (
                <div className="errores">
                    <ul>
                        {errors.map((error, index) => (
                            <li className="error" key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>

        <div className="tusdirecciones">
            <h2>Tus direcciones</h2>
            {links.length > 0 ? (
            links.map((link, index) => (
            <div key={index} className="seccionejemplo">
                <div className="ejemplo">
                    {modificarIndex === index ? (
                        <form className="modificarform" onSubmit={(event) => handleSubmitModificar(event, link.id)}>
                            <input className="inputmodificar" 
                            type="text" 
                            name="longLink"
                            value={formDataModificar.longLink} 
                            onChange={(event) => handleInputChangeModificar(event, link.longLink)}
                            />
                            <button className="confirmarcambios">Confirmar Cambios</button>
                        </form>
                    ): (
                        <h3 className="longurlh3">{link.longLink}</h3>
                    )}
                    <div className="shorturldiv">
                        <Link to={link.longLink} target="_blank" className="enlaceshorturl">
                            <h3>{link.nanoLink}</h3>
                            <img src={enlace} alt="" width={"19px"} height={"19px"} />
                        </Link>
                    </div>
                </div>
            <div className="botonesejemplo">
            <button className="button1 botonejemplo copiar" onClick={() => handleCopyToClipboard(`https://short-url-front-seven.vercel.app/${link.nanoLink}`)}>Copiar</button>
                {modificarIndex === index ? (
                    <button className="button1 botonejemplo modificar" onClick={() => handleModificar(link.longLink)}>Cancelar Modificación</button>
                ): (
                    <button className="button1 botonejemplo modificar" onClick={() => handleModificar(index, link.longLink)} >Modificar</button>                    
                )}
                <button className="button1 botonejemplo eliminar" onClick={() => removeLink(link.id)}>Eliminar</button>
            </div>
            {modificarIndex === index && errorsModificar.length > 0 && (
                <div className="errores">
                    <ul>
                        {errorsModificar.map((error, index) => (
                            <li className="error" key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
        ))
        ) : (
            <h3 className="nolinks">No tienes links agregados</h3>
        )}

        </div>
    </main>
    </>
  )
}

export default User
