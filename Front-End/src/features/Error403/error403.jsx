import React, { useEffect, useState } from "react";
import HeaderApp from "../../components/HeaderApp/headerApp";
import FooterMain from "../../components/FooterMain/FooterMain";
import "./error403.css";


const Error403 = () => {
  useEffect(() => {
    document.title = "Acceso restringido";
  }, []);

  return (
    <div className="error403-page">
      <div className="error403-content">
        <i className="bi bi-lock-fill error-icon"></i>
        <h1>Error 403</h1>
        <p>No tienes permiso para acceder a este página.</p>
      </div>
      <FooterMain/>
    </div>
  );
};

export default Error403;