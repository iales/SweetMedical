import React, {useState, useEffect}from 'react';
import { Link } from 'react-router-dom';
import './tarjetaTurnoMain.css'; 
import EstadoTurnoMain from '../EstadoTurno/estadoTurno.jsx';
import { findPracticaById } from '../../services/practicasService.js';
import { findPacienteById } from '../../services/pacientesService.js';
import { findSedeById } from '../../services/sedesService.js';
import { findMedicoById } from '../../services/medicosService.js';
import { formatFechaHora } from '../../utils/dateUtils.js';
import { confirmarModificacionTurno } from '../../services/turnosService.js';


const TarjetaTurnoMain = ({ turno, user }) => {
  const turnoCancelable = turno.estado !== "CANCELADO" && turno.estado !== "REALIZADO";
  const turnoModificable = turno.estado === "RESERVADO";
  const [loading, setLoading] = useState(true);
  const [turnoData,setTurnoData] = useState({});
  const [practica,setPractica] = useState();
  const [confirmandoModificacion, setConfirmandoModificacion] = useState(false);
  const [errorConfirmacion, setErrorConfirmacion] = useState("");

  useEffect(() => { 
    const getTurnoData = async () => {  
      try{
        let datosTurno = null;
        const ultimoCambioPendiente = [...(turno.historialEstados || [])]
          .reverse()
          .find((cambio) => cambio.estado === "ESPERANDO_CONFIRMACION");
        if(user.rol=="medico"){ 
          const practica = await findPracticaById(turno.practicaId);
          const paciente = await findPacienteById(turno.pacienteId);
          const sede = await findSedeById(turno.sedeId);
         
          datosTurno = {
            nombre: paciente.nombre,
            estado: turno.estado,
            sede: sede.nombre,
            fechaHora: turno.fechaHora,
            especialidad: practica.nombreEspecialidad,
            practica: practica.nombre,
            costo: turno.costo,
            motivoModificacion: ultimoCambioPendiente?.motivo
          };
          
        }
        
        if(user.rol=="paciente"){
          const practica = await findPracticaById(turno.practicaId);
          const medico = await findMedicoById(turno.medicoId);
          const sede = await findSedeById(turno.sedeId);
         
          datosTurno = {
            nombre: medico.nombre,
            estado: turno.estado,
            sede: sede.nombre,
            fechaHora: turno.fechaHora,
            especialidad: practica.nombreEspecialidad,
            practica: practica.nombre,
            costo: turno.costo,
            motivoModificacion: ultimoCambioPendiente?.motivo
          };
        }
        setTurnoData(datosTurno);
        
        }
          catch(error){
            console.log("Entro al catch");
          } finally{setLoading(false);}
        }
        
      
        if (turno && user?.id && user?.rol) {
          getTurnoData();
        }
  }, [user, turno]);

  const handleConfirmarModificacion = async () => {
    setConfirmandoModificacion(true);
    setErrorConfirmacion("");

    try {
      const turnoConfirmado = await confirmarModificacionTurno(turno.id || turno._id);
      setTurnoData((datosActuales) => ({
        ...datosActuales,
        estado: turnoConfirmado.estado
      }));
    } catch (error) {
      setErrorConfirmacion("No se pudo confirmar la modificacion.");
    } finally {
      setConfirmandoModificacion(false);
    }
  };
  if (!turno) return (<h1>404 not found</h1>);
  
  return (
  <div className="tarjeta-contenedor">
      <EstadoTurnoMain estado={turnoData.estado}></EstadoTurnoMain>

      <div className="tarjeta-cuerpo">
        <div className="tarjeta-logo-box">
          <img src="/images/Logo sweet.png" alt="Logo Sweet Medical" className="tarjeta-logo-img"/>
        </div>

        <div className="tarjeta-info-box">
          <h4 className="info-titulo">{turnoData.especialidad} - {turnoData.practica}</h4>
          {user.rol =="medico"?
           <p className="info-texto"><strong>paciente:</strong> {turnoData.nombre}</p>
           :
           <p className="info-texto"><strong>Profesional:</strong> {turnoData.nombre}</p>
           }
          <p className="info-texto"><strong>Sede:</strong> {turnoData.sede}</p>
          {turnoData.estado === "ESPERANDO_CONFIRMACION" && turnoData.motivoModificacion && (
            <p className="motivo-modificacion-turno">
              <strong>Motivo del cambio:</strong> {turnoData.motivoModificacion}
            </p>
          )}
          
          <div className="info-detalles-linea">
            <span><i className="bi bi-calendar3"></i> {formatFechaHora(turno.fechaHora)}</span>
            <span><i className="bi bi-cash-coin"></i> <strong>Costo:</strong> {turno.costo === 0 ? `$0 (Cubierto por plan)` : `$${turno.costo}`}</span>
          </div>
        </div>

        <div className="tarjeta-acciones-box">
          {user.rol === "paciente" && turnoData.estado === "ESPERANDO_CONFIRMACION" && (
            <button
              type="button"
              className="btn-accion btn-confirmar-modificacion-turno"
              onClick={handleConfirmarModificacion}
              disabled={confirmandoModificacion}
            >
              <i className="bi bi-check-circle"></i>
              {confirmandoModificacion ? "Confirmando..." : "Confirmar modificacion"}
            </button>
          )}
          {user.rol === "medico" && turnoModificable && (
            <Link to={`/modificar-turno/${turno.id || turno._id}`} className="btn-accion btn-modificar btn-modificar-link">
              <i className="bi bi-pencil-square"></i> Modificar Turno
            </Link>
          )}
          {user.rol === "medico" && turnoData.estado === "ESPERANDO_CONFIRMACION" && (
            <button type="button" className="btn-accion btn-modificacion-pendiente" disabled>
              <i className="bi bi-hourglass-split"></i> Esperando respuesta
            </button>
          )}
          {turnoCancelable ? (
            <Link to={`/cancelar-turno/${turno.id}`} className="btn-accion btn-cancelar btn-cancelar-link">
              <i className="bi bi-x-circle"></i> Cancelar Turno
            </Link>
          ) : (
            <button className="btn-accion btn-cancelar-disabled" disabled>
              <i className="bi bi-x-circle"></i> No cancelable
            </button>
          )}
        </div>
      </div>

      {errorConfirmacion && <p className="error-confirmacion-turno">{errorConfirmacion}</p>}

      <hr className="tarjeta-divisor" />

      <div className="tarjeta-aviso">
        <i className="bi bi-info-circle-fill"></i>
        <p><strong>Recordatorio:</strong> Presentarse 15 minutos antes con credencial fisica.</p>
      </div>
    </div>
  );
};

export default TarjetaTurnoMain;
