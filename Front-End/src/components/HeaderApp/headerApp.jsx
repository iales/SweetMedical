import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import NavBar from "../NavBar/navbar";
import { findNotificaciones } from "../../services/notificacionesService";
import "./headerApp.css";

const HeaderApp = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cantidadNoLeidas, setCantidadNoLeidas] = useState(0);

  useEffect(() => {
    const cargarCantidad = async () => {
      try {
        const noLeidas = await findNotificaciones(false);
        setCantidadNoLeidas(noLeidas.length);
      } catch (error) {
        setCantidadNoLeidas(0);
      }
    };

    cargarCantidad();
  }, []);


  return (
    <>
      <header className="header-app">
        <div className="logoSweetApp">
          <Link to="/main">
            <img src="/images/Logo sweet.png" alt="Sweet Logo" />
          </Link>
        </div>

        <button
          type="button"
          className="header-app-menu"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className={menuOpen ? "bi bi-x-lg" : "bi bi-list"}></i>
        </button>

        <div className={`header-app-content ${menuOpen ? "header-app-content-open" : ""}`}>
          <NavBar />

          <div className="header-app-actions">
            <Link to="/notificaciones" className="header-app-notifications" aria-label="Notificaciones">
              <i className="bi bi-bell"></i>
              {cantidadNoLeidas > 0 && <span className="notificaciones-count">{cantidadNoLeidas}</span>}
            </Link>

            <Link to="/perfil" className="header-app-profile" aria-label="Perfil">
              <i className="bi bi-person-fill"></i>
            </Link>
          </div>
        </div>
      </header>
      <Outlet/>
    </>
  );
};

export default HeaderApp;