import icono from "../images/abeja.png"
import "../estilos/global.css"
import { Link } from "react-router-dom"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Logup = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        repassword: ''
      });

    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://shorturlback.onrender.com/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 400) {
                    setErrors(["Ya existe este usuario"])
                }
                if (response.status === 500) {
                    setErrors(["Error de servidor"])
                }
                const errorMessages = errorData.errors.map(error => error.msg);
                setErrors(errorMessages);
            }
            else{
                const responseData = await response.json(); // Parsea los datos de la respuesta
                const token = responseData.token; // Obtiene el token de los datos de la respuesta
                localStorage.setItem('token', token);
                navigate('/user');
                alert('Registro realizado con éxito');
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };


  return (
    <>
    <nav>
        <img src={icono} alt="" width={"55px"} />
        <div className="usuario">
            <Link to="/" className="paginar"><h4>Inicio</h4></Link>
            <Link to="/login" className="paginar"><h4>Iniciar Sesión</h4></Link>
        </div>
    </nav>
    <main>
    <div className="secciontitulo">
            <h1>Registro</h1>
    </div>
    <div className="adorno logup"></div>
    <form className="logform logup" onSubmit={handleSubmit}>
        <div className="formsec">
            <label htmlFor=""><h2>Email</h2></label>
            <input className="input1 login" 
            type="text" 
            placeholder="ejemplo@gmail.com" 
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            />
        </div>
        <div className="formsec">
            <label htmlFor=""><h2>Contraseña</h2></label>
            <input className="input1 login" 
            type="password" 
            placeholder="Al menos 6 caracteres" 
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            />
        </div>
        <div className="formsec">
            <label htmlFor=""><h2>Repite la contraseña</h2></label>
            <input 
            className="input1 login" 
            type="password" 
            name="repassword"
            value={formData.repassword}
            onChange={handleInputChange}
            />
        </div>
        <button className="button1 login">Registrarse</button>
        {errors.length > 0 && (
                <div className="errores">
                    <ul>
                        {errors.map((error, index) => (
                            <li className="error" key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
        )}
    </form>
    </main>
    </>
  )
}

export default Logup