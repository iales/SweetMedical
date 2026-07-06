import React, {useState, useEffect} from "react";
import './formularioSacarTurno.css'
import Select from "react-select";  
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PosibleTurno from '../PosibleTurno/posibleTurno';
import { useSession } from '../../components/SessionContext/sessionContext';

import { findAllPracticas } from "../../services/practicasService";
import { findMedicosByPracticaId } from "../../services/medicosService";
import { findSedes } from "../../services/sedesService";
import { findTurnosByPacienteRequirements } from "../../services/turnosService";
import Loader from '../../components/Loader/loader.jsx'




const FormularioSacarTurno = () => {

    const [loading, setLoading] = useState(true);
    const { user } = useSession();

    const [opcionesPracticas, setOpcionesPracticas] = useState([]);
    const [opcionesMedicos, setOpcionesMedicos] = useState([]);
    const [opcionesSedes, setOpcionesSedes] = useState([]);

    const [practica, setPractica] = useState("");  
    const [fecha, setFecha] = useState(null);
    const [medico, setMedico] = useState("");
    const [sede, setSede] = useState("");
    const [resultados, setResultados] = useState([]);
    const [buscado, setBuscado] = useState(false);  
    
    

    //----------------------- Funciones back -----------------------------
    const cargarPracticas = async () => {
      var opcionesCargadas = await findAllPracticas();

      opcionesCargadas = opcionesCargadas.map(p => ({
      value: p.id,
      label: p.nombre
    }));

      setOpcionesPracticas(opcionesCargadas);
    }
    

    const handleSubmit = async(e) => {
    e.preventDefault();
  
    const fechaFormateada = fecha.toISOString().split("T")[0]; 

  try {
    const resultadosObtenidos = await findTurnosByPacienteRequirements({
      practicaId: practica.value,                  
      fecha: fechaFormateada,        
      medicoId: medico ? medico.value : null,
      sedeId: sede ? sede.value : null
    });
    setResultados(resultadosObtenidos);
  } catch (error) {
    console.error("Error buscando turnos:", error);
    setResultados([]);
  }
    setBuscado(true);
  };


    useEffect(() => {
        const cargarDatos = async () => {
        await cargarPracticas();
        setLoading(false);
        }; cargarDatos();
    },[])

    useEffect(() => {
        const cargarMedicos = async () => {
        if (practica) {
        try {
            var medicosCargados = await findMedicosByPracticaId(practica.value);

            medicosCargados = medicosCargados.map(m => ({
            value: m.id,
            label: m.nombre
            }));

            setOpcionesMedicos(medicosCargados);
        } catch (error) {
            console.error("Error cargando médicos:", error);
        }
        }
    };  
    cargarMedicos();
    }, [practica]);


    useEffect(() => {
        const cargarSedes = async () => {
        if (practica) {
        try {
            var sedesCargadas = await findSedes();

            sedesCargadas = sedesCargadas.map(m => ({
            value: m.id,
            label: m.nombre
            }));

            setOpcionesSedes(sedesCargadas);
        } catch (error) {
            console.error("Error cargando sedes:", error);
        }
        }
    };  
    cargarSedes();
    }, [practica]);

    
    //----------------------- Funciones back -----------------------------

    
    if (loading) {
    return <Loader texto="Cargando datos del sistema..." />;
    }

    return(
    <>

    <form onSubmit={handleSubmit} className="form-sacarTurno">
    <div className = "form-row">
    <div className = "form-group"> 
    <label>Práctica: </label>
        <Select
        options={opcionesPracticas}
            value={practica}
            onChange={(selected) => setPractica(selected)}
            placeholder="Prácticas disponibles"
            isClearable/>
    </div>

     <div className="form-group datepicker-wrapper">
    <label>Fecha: </label>
    <DatePicker
        selected={fecha}
        onChange={(date) => setFecha(date)}
        dateFormat="dd/MM/yyyy"
        placeholderText="Seleccione fecha"
        className="datepicker-input"
        minDate={new Date()}
    />
    </div>
    </div>


    {practica && fecha && (
    <>

    <div className = "form-row-opcional">
    <div className = "form-group">
    <label>Médico (opcional): </label>
        <Select
        options={opcionesMedicos}
            value={medico}
            onChange={(selected) => setMedico(selected)}
            placeholder="Cualquier Médico"
            isClearable />
             
    </div>    
   
    <div className = "form-group">
    <label>Sede (opcional): </label>
        <Select
        options={opcionesSedes}   
            value={sede}
            onChange={(selected) => setSede(selected)}
            placeholder="Cualquier Sede"
            isClearable/>
            
    </div>
    </div>
    </>
    )}

    <button type="submit" className="btn-buscar" disabled={!practica || !fecha}>Buscar turnos</button>
    </form>


    {buscado && resultados.length === 0 && (
    <div className="sin-resultados">No hay turnos disponibles para los criterios seleccionados.
    </div>
    )}

    {buscado && resultados.length > 0 && (
    <div className="turnos-disponibles-container">
        <h3 className="resultados-titulo">Turnos disponibles</h3>
        <div className="resultados-container">
        {resultados.map((r) => (
            <PosibleTurno
                medicoId={r.medicoId}
                practicaId={r.practicaId}
                sedeId={r.sedeId}
                nombreMedico={r.nombreMedico}
                nombrePractica={r.nombrePractica}
                especialidad={r.nombreEspecialidad}
                desde={r.desde}
                nombreSede={r.nombreSede}
                duracionTurnoEnMins={r.duracionTurnoEnMins}
                costo={r.costo}
        />
        ))}
    </div>
    </div>

    )}
    </>);
}

export default FormularioSacarTurno
