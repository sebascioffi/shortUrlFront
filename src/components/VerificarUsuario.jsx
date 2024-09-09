import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerificarUsuario = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem('token');

    if (!token) {
      // Si no hay token en el almacenamiento local, redirigir al usuario a la página de inicio de sesión
      navigate('/');
    }

  }, [navigate]);

  return <>{children}</>;
};

export default VerificarUsuario;
