import React, {useState, useEffect} from 'react';
import { Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BackButton from '../BackButton/backButton';
import { findEspecialidadBymedicoId, getDisponibilidadesByMedico, addPractica, removePractica, findPracticasByMedicoId } from '../../services/medicosService';
import { findPracticas } from '../../services/practicasService';

import './perfilMedico.css'; 
import '../../features/Perfil/perfil.css'

import SectionBar from '../SectionBar/sectionBar';
import SectionMedicoInfo from '../SectionMedicoInfo/sectionMedicoInfo';
import AgendaTurnos from '../AgendaTurnos/agendaTurnos';
import PracticasSection from '../PracticaSection/practicaSection';

const PerfilMedico = ({user}) => {
  const [seccionActiva, setSeccionActiva] = useState('datos');

  const menuOpciones = [
    { id: 'datos', nombre: 'Mis Datos Profesionales', icono: '👨‍⚕️' },
    { id: 'agenda', nombre: 'Agenda de Turnos', icono: '📅' }, 
    { id: 'practicas', nombre: 'Gestion de Practicas', icono: '💉'}
  ];

  const [medicoData,setMedicoData] = useState(user);
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
      const cargarEspecialidades = async () => {
        let nombresEspecialidades = null;
        try {
            if (user?.id) {
                const data = await findEspecialidadBymedicoId(user.id);
                nombresEspecialidades = data.map(e => e.nombreEspecialidad);  
                const datosMedico = {
                  ...medicoData,
                  especialidades: nombresEspecialidades
                }
                setMedicoData(datosMedico)
            }
        } catch (error) {
            setEspecialidades([]);
        }
      };
    cargarEspecialidades();
  }, [user]);

  const recargarAgenda = async () => {
    try {
      const nuevasDisponibilidades = await getDisponibilidadesByMedico(medicoData.id);
      
      setMedicoData(datosPrevios => ({
        ...datosPrevios,
        disponibilidades: nuevasDisponibilidades
      }));
    } catch (error) {
      console.error("Error al recargar la agenda desde el padre", error);
    }
  };

  const recargarPracticas = async () => {
    try {
      const practicasActualizadas = await findPracticasByMedicoId(medicoData.id); 
      
      setMedicoData(datosPrevios => ({
        ...datosPrevios,
        practicas: practicasActualizadas 
      }));
    } catch (error) {
      console.error("Error al recargar las prácticas desde el padre", error);
    }
  };

  const datosFormateados = {
    nombre: user.nombre,
    apellido: user.apellido,
    tipo: user.tipo,
    foto: user.foto,
    subtitulo: especialidades
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        
        height: 'calc(100vh - 85px)', 
        
        overflow: 'hidden', 
        
        backgroundColor: '#f8f9fa' 
      }}
    >
        
        <SectionBar 
            usuario={datosFormateados} 
            opciones={menuOpciones} 
            seccionActiva={seccionActiva} 
            alCambiarSeccion={setSeccionActiva} 
        /> 

        
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            width: '100%', 
            height: '100%', 
            overflowY: 'auto', 
            
            p: { xs: 1, md: 2 } 
          }}
        >
          
          {seccionActiva === 'datos' && (
            <SectionMedicoInfo medicoData={medicoData}/>
          )}
          
          {seccionActiva === 'agenda' && (
            <AgendaTurnos 
              medicoId={medicoData.id} 
              disponibilidades={medicoData.disponibilidades} 
              sedes={medicoData.sedes} 
              onActualizarAgenda={recargarAgenda}
            />
          )}

          {seccionActiva === 'practicas' && (
            <PracticasSection 
              medicoId={medicoData.id} 
              practicasAsignadas={medicoData.practicas} 
              onActualizarPerfil={recargarPracticas} 
            />
          )}

        </Box>
    </Box>
  );
};

export default PerfilMedico;