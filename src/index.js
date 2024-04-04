import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import UserProvider from "./context/UserProvider"
import Inicio from './routes/Inicio';
import Login from './routes/Login';
import Logup from './routes/Logup';
import User from './routes/User';
import VerificarUsuario from "./components/VerificarUsuario"
import VerificarInicio from "./components/VerificarInicio"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={
            <VerificarInicio>
              <App />
            </VerificarInicio>
          }>
            <Route index element={<Inicio />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logup' element={<Logup />} />
            <Route path='/user' element={
              <VerificarUsuario>
                <User />
              </VerificarUsuario>
            } />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

