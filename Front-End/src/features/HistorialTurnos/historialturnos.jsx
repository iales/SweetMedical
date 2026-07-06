import React, { useEffect, useState } from "react";
import { findMisTurnos } from "../../services/turnosService";
import { findMedicoById } from "../../services/medicosService";
import { findSedeById } from "../../services/sedesService";
import "./historialturnos.css";
import Loader from '../../components/Loader/loader.jsx'


const crearFechaLocal = (fechaHora) => {
  return new Date(fechaHora.replace("Z", ""));
};

const HistorialTurnos = () => {

  const [loading, setLoading] = useState(true);

  const [turnos, setTurnos] = useState([]);
  const [estadosSeleccionados, setEstadosSeleccionados] = useState(["Todos"]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Historial de turnos";
    cargarTurnos();
    setLoading(false);
  }, []);

  const nombreEstado = (estado) => {
    if (estado === "RESERVADO") {
      return "Pendiente";
    }

    if (estado === "REALIZADO") {
      return "Realizado";
    }

    if (estado === "CANCELADO") {
      return "Cancelado";
    }

    if (estado === "ESPERANDO_CONFIRMACION") {
      return "Esperando confirmacion";
    }

    return estado;
  };

  const cargarTurnos = async () => {
    setCargando(true);
    setError("");

    try {
      const data = await findMisTurnos();

      const turnosConDatos = await Promise.all(data.map(async (turno) => {
        const medico = await findMedicoById(turno.medicoId);
        const sede = await findSedeById(turno.sedeId);

        return {
          id: turno.id,
          fechaHora: turno.fechaHora,
          medico: medico.nombre,
          servicio: turno.nombrePractica,
          sede: sede.nombre,
          estado: nombreEstado(turno.estado),
        };
      }));

      setTurnos(turnosConDatos);
    } catch (error) {
      console.error("Error al cargar historial de turnos", error);
      setTurnos([]);
      setError("No se pudo cargar el historial de turnos.");
    }

    setCargando(false);
  };

  const filtroActivo = (estado) => {
    return estadosSeleccionados.includes(estado);
  };

  const cambiarFiltro = (estado) => {
    if (estado === "Todos") {
      setEstadosSeleccionados(["Todos"]);
      return;
    }

    let nuevosEstados = estadosSeleccionados.filter((estadoSeleccionado) => estadoSeleccionado !== "Todos");

    if (nuevosEstados.includes(estado)) {
      nuevosEstados = nuevosEstados.filter((estadoSeleccionado) => estadoSeleccionado !== estado);
    } else {
      nuevosEstados.push(estado);
    }

    if (nuevosEstados.length === 0) {
      setEstadosSeleccionados(["Todos"]);
    } else {
      setEstadosSeleccionados(nuevosEstados);
    }
  };

  const filtrarTurnos = () => {
    if (filtroActivo("Todos")) {
      return turnos;
    }

    return turnos.filter((turno) => estadosSeleccionados.includes(turno.estado));
  };

  const formatearFecha = (fechaHora) => {
    const fecha = crearFechaLocal(fechaHora);
    return fecha.toLocaleDateString("es-AR");
  };

  const formatearHora = (fechaHora) => {
    const fecha = crearFechaLocal(fechaHora);
    return fecha.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const claseEstado = (estadoTurno) => {
    return estadoTurno.toLowerCase().replaceAll(" ", "-");
  };

  const turnosFiltrados = filtrarTurnos();


 if (loading) {
    return <Loader texto="Cargando historial..." />;
  }


  return (
    <div className="historial-page">

      <div className="historial-container">
        <h1>Historial de turnos</h1>
        <p className="historial-texto">Aca podes ver todos los turnos que tuviste.</p>
        <div className="historial-contadores">
          <button
            className={filtroActivo("Todos") ? "contador-activo" : ""}
            onClick={() => cambiarFiltro("Todos")}
          >
            Total: {turnos.length}
          </button>
          <button
            className={filtroActivo("Pendiente") ? "contador-activo" : ""}
            onClick={() => cambiarFiltro("Pendiente")}
          >
            Pendientes: {turnos.filter((turno) => turno.estado === "Pendiente").length}
          </button>
          <button
            className={filtroActivo("Realizado") ? "contador-activo" : ""}
            onClick={() => cambiarFiltro("Realizado")}
          >
            Realizados: {turnos.filter((turno) => turno.estado === "Realizado").length}
          </button>
          <button
            className={filtroActivo("Cancelado") ? "contador-activo" : ""}
            onClick={() => cambiarFiltro("Cancelado")}
          >
            Cancelados: {turnos.filter((turno) => turno.estado === "Cancelado").length}
          </button>
          <button
            className={filtroActivo("Esperando confirmacion") ? "contador-activo" : ""}
            onClick={() => cambiarFiltro("Esperando confirmacion")}
          >
            Esperando confirmacion: {turnos.filter((turno) => turno.estado === "Esperando confirmacion").length}
          </button>
        </div>

        {cargando && <p className="historial-mensaje">Cargando turnos...</p>}
        {error && <p className="historial-error">{error}</p>}

        <div className="tabla-contenedor">
          <table className="tabla-historial">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Medico</th>
                <th>Servicio</th>
                <th>Sede</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {turnosFiltrados.map((turno) => (
                <tr key={turno.id}>
                  <td>{formatearFecha(turno.fechaHora)}</td>
                  <td>{formatearHora(turno.fechaHora)}</td>
                  <td>{turno.medico}</td>
                  <td>{turno.servicio}</td>
                  <td>{turno.sede}</td>
                  <td>
                    <span className={`estado estado-${claseEstado(turno.estado)}`}>
                      {turno.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!cargando && turnosFiltrados.length === 0 && !error && <p className="sin-turnos">No hay turnos para mostrar.</p>}
      </div>
    </div>
  );
};

export default HistorialTurnos;