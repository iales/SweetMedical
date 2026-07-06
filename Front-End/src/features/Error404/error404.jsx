import React, { useEffect, useState } from "react";
import HeaderApp from "../../components/HeaderApp/headerApp";
import FooterMain from "../../components/FooterMain/FooterMain";
import "./error404.css";


const Error404 = () => {
  useEffect(() => {
    document.title = "Página no encontrada";
  }, []);

  return (
    <div className="error404-page">
      <HeaderApp />
      <div className="error404-content">
        <i class="bi bi-exclamation-triangle-fill error-icon"></i>
        <h1>Error 404</h1>
        <p>La página que buscas no existe.</p>
      </div>
      <FooterMain/>
    </div>
  );
};

export default Error404;