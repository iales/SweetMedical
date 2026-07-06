import React, { useState, useEffect } from "react";
import { Box, Typography } from '@mui/material';
import { findObraSocialById } from "../../services/obrasSocialesService";
import { useNavigate } from 'react-router-dom';
import SectionBar from "../SectionBar/sectionBar";
import SectionPacienteInfo from "../SectionPacienteInfo/sectionPacienteInfo";


const PerfilPaciente = ({ user }) => {
  const navigate = useNavigate();

  const [seccionActiva, setSeccionActiva] = useState('datos');
  const [usuarioData, setPacienteData] = useState(user);

  const [obraSocialAsociada, setObraSocialAsociada] = useState(null);
  const [planAsociado, setPlanAsociado] = useState(null);

  useEffect(() => {
      const cargarObraSocial = async () => {
          if (usuarioData?.obraSocialId) {
              try {
                  const obraSocial = await findObraSocialById(usuarioData.obraSocialId);
                  setObraSocialAsociada(obraSocial);
                  const plan = obraSocial?.planes?.find(p => p.planId == usuarioData?.planId);
                  setPlanAsociado(plan);
              } catch (error) {
                  console.error("Error cargando obra social:", error);
              }
          }
      };
    cargarObraSocial();
  }, [usuarioData]);

  const handleGuardarDatos = (nuevosDatos) => {
    setPacienteData(nuevosDatos);
    console.log("Datos guardados:", nuevosDatos);
  };

  const menuOpciones = [
    { id: 'datos', nombre: 'Mis Datos Personales', icono: '👤' }
    
  ];

  const datosFormateados = {
    nombre: usuarioData?.nombre,
    apellido: usuarioData?.apellido,
    tipo: usuarioData?.tipo,
    foto: usuarioData?.foto,
    subtitulo: usuarioData?.id 
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
        
        <Box sx={{ width: '100%', maxWidth: '1000px', margin: '0 auto', p: { xs: 2, sm: 3 } }}>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#cb0e0e', m: 0 }}>
                Panel del Paciente
              </Typography>
            </Box>

            {seccionActiva === 'datos' && (
              <SectionPacienteInfo
                usuarioData={usuarioData}
                obraSocialAsociada={obraSocialAsociada}
                planAsociado={planAsociado}
              />
            )}
            
        </Box>
      </Box>
    </Box>
  );
};

export default PerfilPaciente;