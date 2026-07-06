import React from "react";
import { Link, useParams } from "react-router-dom";
import "./turnoCancelado.css";

const TurnoCancelado = () => {

  return (
    <div className="turno-cancelado-page">
      <div className="turno-cancelado-container">
        <i className="bi bi-check-circle-fill turno-cancelado-icon"></i>
        <h1>Turno cancelado</h1>
        <p>El turno fue cancelado correctamente. </p>
        <Link to="/main" className="btn-volver">Volver al panel</Link>
      </div>
    </div>
  );
};

export default TurnoCancelado;