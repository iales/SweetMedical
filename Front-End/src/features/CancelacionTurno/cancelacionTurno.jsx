import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { cancelarTurno, findTurnoById } from "../../services/turnosService";
import { findMedicoById } from "../../services/medicosService.js";
import { findSedeById } from "../../services/sedesService.js";
import { findPracticaById } from "../../services/practicasService.js";
import Loader from '../../components/Loader/loader.jsx'
import { formatFechaHora } from "../../utils/dateUtils.js";

import "./cancelacionTurno.css";

const CancelacionTurno = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loadingCancel, setLoadingCancel] = useState(false);

  

  const [motivo, setMotivo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [turno, setTurno] = useState(null);


  useEffect(() => {
  document.title = "Cancelar turno";
    
    console.log(id);

  const getTurno = async () => {
    try{
     const turnoBase = await findTurnoById(id);

        const [medico, practica, sede] = await Promise.all([
          findMedicoById(turnoBase.medicoId),
          findPracticaById(turnoBase.practicaId),
          findSedeById(turnoBase.sedeId)
        ]);

        const turnoCompleto = {
          ...turnoBase,
          nombreMedico: medico.nombre,
          nombrePractica: practica.nombre,
          nombreEspecialidad: practica.nombreEspecialidad,
          nombreSede: sede.nombre
        };

        setTurno(turnoCompleto);
  }catch (err) {
        console.error("Error al traer turno", err);
      } finally {
        setLoading(false); 
      }

  };  if (id) {
      getTurno();
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!motivo.trim()) {
      setError("Debe ingresar un motivo para cancelar el turno");
      return;
    }

    setLoadingCancel(true);

    try {
      await cancelarTurno(id, motivo);
      navigate(`/turno-cancelado`);
    } catch (error) {
      console.error("Error al cancelar turno", error);
    } finally {
    setLoadingCancel(false);
  }
  };

  if (!turno) {
    return (
      <div className="cancelacion-page">
        <div className="cancelacion-container">
          <h2>Turno no encontrado</h2>
          <Link to="/main" className="btn-volver-cancelacion">Volver</Link>
        </div>
      </div>
    );
  }

    if (loading || loadingCancel) {
    return <Loader texto="Aguarde un momento por favor..." />;
    }

  return (
    <div className="cancelacion-page">
      <div className="cancelacion-container">
        <h1>Cancelar turno</h1>
        <p className="cancelacion-aclaracion">
          Para cancelar el turno debe indicar un motivo. Recorda que solo se puede cancelar con al menos una hora de anticipacion.
        </p>

        <div className="cancelacion-detalle">
          <h3>Datos del turno</h3>
          <p><strong>Practica:</strong> {turno.nombrePractica}</p>
          <p><strong>Medico:</strong> {turno.nombreMedico}</p>
          <p><strong>Sede:</strong> {turno.nombreSede}</p>
          <p><strong>Fecha y hora:</strong> {formatFechaHora(turno.fechaHora)}</p>
          <p><strong>Estado actual:</strong> {turno.estado}</p>
        </div>

        <form onSubmit={handleSubmit} className="form-cancelacion">
          <label htmlFor="motivo">Motivo de cancelacion</label>
          <textarea
            id="motivo"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder="Ej.: No puedo asistir al turno"
            rows="5"
          />

          {error && <p className="cancelacion-error">{error}</p>}
          {mensaje && <p className="cancelacion-exito">{mensaje}</p>}

          <div className="cancelacion-botones">
            <button type="submit" className="btn-confirmar-cancelacion">Confirmar cancelacion</button>
            <Link to="/main" className="btn-volver-cancelacion">Volver</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CancelacionTurno;
