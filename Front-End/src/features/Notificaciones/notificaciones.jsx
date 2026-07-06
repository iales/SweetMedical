import React, { useEffect, useState } from "react";
import { findNotificaciones, marcarNotificacionComoLeida } from "../../services/notificacionesService";
import "./notificaciones.css";

const Notificaciones = () => {
  const [filtro, setFiltro] = useState("noLeidas");
  const [notificaciones, setNotificaciones] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Notificaciones";
  }, []);

  useEffect(() => {
    cargarNotificaciones();
  }, [filtro]);

  const cargarNotificaciones = async () => {
    setCargando(true);
    setError("");

    try {
      let leida;

      if (filtro === "leidas") {
        leida = true;
      }

      if (filtro === "noLeidas") {
        leida = false;
      }

      const data = await findNotificaciones(leida);
      setNotificaciones(data);
    } catch (error) {
      setNotificaciones([]);
      setError("No se pudieron cargar las notificaciones.");
    }

    setCargando(false);
  };

  const marcarComoLeida = async (id) => {
    try {
      await marcarNotificacionComoLeida(id);
      cargarNotificaciones();
    } catch (error) {
      setError("No se pudo marcar la notificacion como leida.");
    }
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleString("es-AR");
  };

  return (
    <div className="notificaciones-page">
      <div className="notificaciones-container">
        <h1>Notificaciones</h1>
        <p className="notificaciones-texto">Aca podes ver los avisos importantes de tus turnos.</p>

        <div className="notificaciones-filtros">
          <button
            className={filtro === "noLeidas" ? "filtro-activo" : ""}
            onClick={() => setFiltro("noLeidas")}
          >
            No leidas
          </button>
          <button
            className={filtro === "leidas" ? "filtro-activo" : ""}
            onClick={() => setFiltro("leidas")}
          >
            Leidas
          </button>
          <button
            className={filtro === "todas" ? "filtro-activo" : ""}
            onClick={() => setFiltro("todas")}
          >
            Todas
          </button>
        </div>

        {cargando && <p className="notificaciones-mensaje">Cargando notificaciones...</p>}
        {error && <p className="notificaciones-error">{error}</p>}

        {!cargando && notificaciones.length === 0 && !error && (
          <p className="notificaciones-mensaje">No hay notificaciones para mostrar.</p>
        )}

        <div className="notificaciones-lista">
          {notificaciones.map((notificacion) => (
            <div key={notificacion.id} className={notificacion.leida ? "notificacion-card leida" : "notificacion-card"}>
              <div className="notificacion-icono">
                <i className={notificacion.leida ? "bi bi-envelope-open" : "bi bi-envelope-fill"}></i>
              </div>

              <div className="notificacion-contenido">
                <p className="notificacion-mensaje">{notificacion.mensaje}</p>
                <p className="notificacion-fecha">{formatearFecha(notificacion.fecha)}</p>
              </div>

              {!notificacion.leida && (
                <button className="btn-marcar-leida" onClick={() => marcarComoLeida(notificacion.id)}>
                  Marcar como leida
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notificaciones;
