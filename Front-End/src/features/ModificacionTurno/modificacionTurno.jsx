import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  actualizarTurno,
  findHorariosDisponiblesParaModificar,
  findTurnoById,
} from "../../services/turnosService";
import { findPacienteById } from "../../services/pacientesService";
import { findPracticaById } from "../../services/practicasService";
import { findSedeById } from "../../services/sedesService";
import Loader from "../../components/Loader/loader";
import { formatFechaHora } from "../../utils/dateUtils";
import "./modificacionTurno.css";

const crearFechaLocal = (fechaHora) => {
  return new Date(fechaHora.replace("Z", ""));
};

const formatearFechaBusqueda = (fecha) => {
  const completar = (numero) => String(numero).padStart(2, "0");
  return `${fecha.getFullYear()}-${completar(fecha.getMonth() + 1)}-${completar(fecha.getDate())}`;
};

const obtenerHora = (fechaHora) => {
  return fechaHora.split("T")[1].substring(0, 5);
};

const ModificacionTurno = () => {
  

  const { id } = useParams();
  const navigate = useNavigate();
  const [turno, setTurno] = useState(null);
  const [fecha, setFecha] = useState(null);
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState("");
  const [motivo, setMotivo] = useState("");
  const [loading, setLoading] = useState(true);
  const [buscandoHorarios, setBuscandoHorarios] = useState(false);
  const [buscado, setBuscado] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    document.title = "Modificar turno";

    const cargarTurno = async () => {
      try {
        const turnoBase = await findTurnoById(id);
        const [paciente, practica, sede] = await Promise.all([
          findPacienteById(turnoBase.pacienteId),
          findPracticaById(turnoBase.practicaId),
          findSedeById(turnoBase.sedeId),
        ]);

        setTurno({
          ...turnoBase,
          nombrePaciente: paciente.nombre,
          nombrePractica: practica.nombre,
          nombreSede: sede.nombre,
        });
        setFecha(crearFechaLocal(turnoBase.fechaHora));
      } catch (error) {
        console.error("Error al cargar el turno", error);
        setError("No se pudo cargar el turno.");
      } finally {
        setLoading(false);
      }
    };

    cargarTurno();
  }, [id]);

  const cambiarFecha = (nuevaFecha) => {
    setFecha(nuevaFecha);
    setHorariosDisponibles([]);
    setHorarioSeleccionado("");
    setBuscado(false);
    setError("");
  };

  const buscarHorarios = async () => {
    if (!fecha) {
      setError("Debe seleccionar una fecha.");
      return;
    }

    setBuscandoHorarios(true);
    setBuscado(false);
    setHorarioSeleccionado("");
    setError("");

    try {
      const horarios = await findHorariosDisponiblesParaModificar({
        turnoId: id,
        fecha: formatearFechaBusqueda(fecha),
      });
      setHorariosDisponibles(horarios);
      setBuscado(true);
    } catch (error) {
      console.error("Error al buscar horarios", error);
      setHorariosDisponibles([]);
      setBuscado(true);
      setError("No se pudieron buscar los horarios disponibles.");
    } finally {
      setBuscandoHorarios(false);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    if (!horarioSeleccionado || !motivo.trim()) {
      setError("Debe seleccionar un horario disponible y completar el motivo.");
      return;
    }

    setGuardando(true);

    try {
      await actualizarTurno({
        turnoId: id,
        fechaHora: horarioSeleccionado,
        motivo: motivo.trim()
      });
      setMensaje("El turno fue modificado. Queda esperando confirmacion del paciente.");
      setTimeout(() => navigate("/main"), 2000);
    } catch (error) {
      console.error("Error al modificar el turno", error);
      setError("No se pudo modificar el turno. El horario puede haber dejado de estar disponible.");
    } finally {
      setGuardando(false);
    }
  };

  if (loading) {
    return <Loader texto="Cargando turno..." />;
  }

  if (!turno) {
    return (
      <div className="modificacion-page">
        <div className="modificacion-container">
          <h2>Turno no encontrado</h2>
          {error && <p className="modificacion-error">{error}</p>}
          <Link to="/main" className="btn-volver-modificacion">Volver</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="modificacion-page">
      <div className="modificacion-container">
        <h1>Modificar turno</h1>
        <p className="modificacion-aclaracion">
          Solo se pueden modificar la fecha y la hora. El paciente deberá confirmar el cambio.
        </p>

        <div className="modificacion-detalle">
          <h3>Datos del turno</h3>
          <p><strong>Paciente:</strong> {turno.nombrePaciente}</p>
          <p><strong>Practica:</strong> {turno.nombrePractica}</p>
          <p><strong>Sede:</strong> {turno.nombreSede}</p>
          <p><strong>Fecha actual:</strong> {formatFechaHora(turno.fechaHora)}</p>
          <p><strong>Estado actual:</strong> {turno.estado}</p>
        </div>

        <form onSubmit={handleSubmit} className="form-modificacion">
          <label htmlFor="fecha">Nueva fecha</label>
          <div className="modificacion-agenda-fila">
            <div className="modificacion-datepicker">
              <DatePicker
                id="fecha"
                selected={fecha}
                onChange={cambiarFecha}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                placeholderText="Seleccione fecha"
                className="modificacion-datepicker-input"
              />
            </div>
            <button
              type="button"
              className="btn-buscar-horarios"
              onClick={buscarHorarios}
              disabled={!fecha || buscandoHorarios}
            >
              {buscandoHorarios ? "Buscando..." : "Buscar horarios"}
            </button>
          </div>

          {buscado && horariosDisponibles.length === 0 && !error && (
            <p className="modificacion-sin-horarios">No hay horarios disponibles para esa fecha.</p>
          )}

          {horariosDisponibles.length > 0 && (
            <div className="modificacion-horarios">
              <p>Horarios disponibles</p>
              <div className="modificacion-horarios-lista">
                {horariosDisponibles.map((horario) => (
                  <button
                    type="button"
                    key={horario.desde}
                    className={horarioSeleccionado === horario.desde ? "horario-seleccionado" : ""}
                    onClick={() => setHorarioSeleccionado(horario.desde)}
                  >
                    {obtenerHora(horario.desde)}
                  </button>
                ))}
              </div>
            </div>
          )}


          <label htmlFor="motivo">Motivo de la modificacion</label>
          <textarea
            id="motivo"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder="Ej.: Cambio en la agenda del profesional"
            rows="4"
          />

          {error && <p className="modificacion-error">{error}</p>}
          {mensaje && <p className="modificacion-exito">{mensaje}</p>}

          <div className="modificacion-botones">
            <button type="submit" className="btn-confirmar-modificacion" disabled={guardando}>
              {guardando ? "Guardando..." : "Confirmar modificacion"}
            </button>
            <Link to="/main" className="btn-volver-modificacion">Volver</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModificacionTurno;
