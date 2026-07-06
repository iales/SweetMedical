import React from "react";
import { Link } from "react-router-dom";
import './footerLanding.css';

const FooterLanding = () => {
    return(
    <section className = "footer-bar">
    <div className="footer-info">
        <p>Contacto: sweetMedical@gmail.com</p>
    </div>
    <div className="footer-info">
        <Link to="/privacidad-normas" className="footer-link">Informacion legal y privacidad</Link>
    </div>
    </section>
    )
}

export default FooterLanding;
