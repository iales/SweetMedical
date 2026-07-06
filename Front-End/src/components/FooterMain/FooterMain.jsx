import React from "react";
import './FooterMain.css';
import { Link } from "react-router-dom";

const FooterMain = () => {
    return(
        <footer className="footer-main">
            <div>
                <h1>Servicios</h1>
                <ul>
                    <li>Telemedicina 24/7</li>
                    <li>Especialidades Médicas</li>
                    <li>Turnos Online</li>
                    <li>Planes de Salud</li>
                </ul>
            </div>

            <div>
                <h1>Legal & Transparencia</h1>
                <ul>
                    <li>
                        <Link to="/privacidad-normas" className="footer-link">
                            Términos y Condiciones
                        </Link>
                    </li>
                    <li>Política de Privacidad</li>
                    <li>Defensa del Consumidor</li>
                    <li>Superintendencia de Servicios de Salud</li>
                </ul>
            </div>

            <div>
                <h1>Conectate con Nosotros</h1>
                <ul>
                    <li>Teléfono: 0800-333-SWEET (7933)</li>
                    <li>Email: sweetmedical@gmail.com</li>
                    <li>Defensa del Consumidor</li>
                    <li>Superintendencia de Servicios de Salud</li>
                </ul>
            </div>            

            <div className = "footer-bottom">
                <p> © 2026 Sweet Medical S.A. <br /> Todos los derechos reservados.</p>
            </div>

        </footer>
    );
}

export default FooterMain;

