import { Routes, Route } from 'react-router-dom';
import "./index.css";
import React from "react";
import Landing from "./features/Landing/landing";
import Login from "./features/Login/login";
import SignIn from "./features/SignIn/signIn";
import HistorialTurnos from "./features/HistorialTurnos/historialturnos";
import SacarTurno from "./features/SacarTurno/sacarTurno"
import Carrito from "./features/Carrito/carrito";
import { CarritoProvider } from "./components/Carrito/carritoContext";
import Perfil from './features/Perfil/perfil';
import Main from "./features/Main/main";
import HeaderApp from './components/HeaderApp/headerApp';
import CancelacionTurno from './features/CancelacionTurno/cancelacionTurno';
import PrivacidadNormas from './features/PrivacidadNormas/privacidadNormas';
import Notificaciones from './features/Notificaciones/notificaciones';
import ModificacionTurno from './features/ModificacionTurno/modificacionTurno';
import Error404 from './features/Error404/error404';
import TurnoCancelado from './features/TurnoCancelado/turnoCancelado';
import Error403 from './features/Error403/error403';
import RoleProtectedRoute from './utils/roleProtectedRoute';


function App() {
  return (
    <CarritoProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/privacidad-normas" element={<PrivacidadNormas />} />
        
        <Route path="/" element={<HeaderApp/>}>
          <Route path="/main" element={<Main />} />
          <Route path="/historial-turnos" element={<RoleProtectedRoute allowedRoles={["paciente", "medico"]}><HistorialTurnos /></RoleProtectedRoute>} />
          <Route path="/sacar-turno" element={<RoleProtectedRoute allowedRoles={["paciente"]}><SacarTurno /></RoleProtectedRoute>} />
          <Route path="/confirmar-turnos" element={<RoleProtectedRoute allowedRoles={["paciente"]}><Carrito /></RoleProtectedRoute>}/>
          <Route path="/notificaciones" element={<Notificaciones />} />
          <Route path="/cancelar-turno/:id" element={<CancelacionTurno />} />
          <Route path="/modificar-turno/:id" element={<RoleProtectedRoute allowedRoles={["medico"]}><ModificacionTurno /></RoleProtectedRoute>} />
          <Route path="/perfil" element= {<Perfil/>}/>
          <Route path="/turno-cancelado" element= {<TurnoCancelado/>}/>
          <Route path="/acceso-denegado" element= {<Error403/>}/>
        </Route>
        <Route path="*" element={<Error404 />} /> 
      </Routes>
    </CarritoProvider>
  );
}

export default App;
