import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useCarrito } from '../Carrito/carritoContext';
import { useSession } from "../../components/SessionContext/sessionContext";

const links = [
  { to: "/main", label: "Inicio", icon: "bi bi-house-door" },
  { to: "/historial-turnos", label: "Historial de turnos", icon: "bi bi-clock-history" }
];


 const sacarTurnoLink = { to: "/sacar-turno", label: "Sacar nuevo turno", icon: "bi bi-calendar-plus" };

const NavBar = () => {
  const { carrito } = useCarrito();
  const navigate = useNavigate();
  const { user } = useSession();

  return (
    <nav className="nav-app" aria-label="Navegacion principal">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            isActive ? "nav-app-link nav-app-link-active" : "nav-app-link"
          }
        >
          <i className={link.icon}></i>
          <span>{link.label}</span>
        </NavLink>
      ))}

      {user?.rol === "paciente" && (
        <NavLink
          to={sacarTurnoLink.to}
          className={({ isActive }) =>
            isActive ? "nav-app-link nav-app-link-active" : "nav-app-link"
          }
        >
          <i className={sacarTurnoLink.icon}></i>
          <span>{sacarTurnoLink.label}</span>
        </NavLink>
      )}

    {user?.rol === "paciente" && (
      <div className="navbar-section right">
        <button className="cart-button" onClick={() => navigate('/confirmar-turnos')}>
         <i className="bi bi-calendar-check"></i>
          {carrito.length > 0 && (
            <span className="cart-count">{carrito.length}</span>
          )}
        </button>
      </div>
    )}

    </nav>
  );
};

export default NavBar;