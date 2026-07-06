import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderLanding from "../../components/HeaderLanding/headerLanding";
import FooterLanding from "../../components/FooterLanding/footerLanding";
import "./privacidadNormas.css";

const PrivacidadNormas = () => {
  useEffect(() => {
    document.title = "Privacidad y normas";
  }, []);

  return (
    <div className="privacidad-page">
      <HeaderLanding />

      <main className="privacidad-container">
        <h1>Privacidad y normas de la plataforma</h1>
        <p className="privacidad-intro">
          En Sweet Medical queremos que los usuarios sepan como se usa la informacion y cuales son las reglas basicas para utilizar la plataforma.
        </p>

        <div className="privacidad-bloque">
          <h2>Privacidad de datos</h2>
          <p>
            Los datos personales, datos de contacto, informacion medica y datos relacionados a turnos se usan solamente para gestionar la atencion dentro de la plataforma.
          </p>
          <p>
            No se deben compartir usuarios, contrasenas ni informacion de otros pacientes o profesionales.
          </p>
        </div>

        <div className="privacidad-bloque">
          <h2>Uso responsable</h2>
          <ul>
            <li>Reservar turnos solo cuando se tenga intencion de asistir.</li>
            <li>Cancelar turnos con anticipacion cuando no se pueda concurrir.</li>
            <li>Completar datos reales en el perfil.</li>
            <li>No utilizar la plataforma para cargar informacion falsa.</li>
          </ul>
        </div>

        <div className="privacidad-bloque">
          <h2>Cancelacion de turnos</h2>
          <p>
            Los turnos pueden cancelarse indicando un motivo. La cancelacion debe realizarse con al menos una hora de anticipacion.
          </p>
        </div>

        <div className="privacidad-bloque">
          <h2>Notificaciones</h2>
          <p>
            La plataforma puede mostrar avisos sobre reservas, confirmaciones, modificaciones o cancelaciones de turnos.
          </p>
        </div>

        <div className="privacidad-bloque">
          <h2>Responsabilidad del usuario</h2>
          <p>
            Cada usuario es responsable de revisar sus turnos, mantener actualizados sus datos y respetar las normas de convivencia de la plataforma.
          </p>
        </div>

        <Link to="/" className="btn-volver-privacidad">Volver al inicio</Link>
      </main>

      <FooterLanding />
    </div>
  );
};

export default PrivacidadNormas;
