import './sessionContext.css';
import React, { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    if (!token) return null; 
    
    try {
      const p = jwtDecode(token);
      
      if (p.exp * 1000 < Date.now()) {        // Aca se fija la expiracion del token
        localStorage.removeItem('token');
        return null;
      }
      return p; 
    } catch (error) {
      return null;
    }
  });

  
  const loginGlobal = (token) => {
    localStorage.setItem('token', token);
    const datosDecodificados = jwtDecode(token);
    setUser(datosDecodificados); 
  };

 
  const logoutGlobal = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  
  return (
    <SessionContext.Provider value={{ user, loginGlobal, logoutGlobal }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}