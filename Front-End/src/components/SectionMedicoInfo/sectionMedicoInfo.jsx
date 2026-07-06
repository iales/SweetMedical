import React from 'react';
import { Box, Paper, Typography, Divider } from '@mui/material';
import './sectionMedicoInfo.css';
import {findSedeById} from '../../services/sedesService';

const InformacionProfesional = ({ medicoData}) => {

  return (
    <Box sx={{ width: '100%', maxWidth: '1000px', margin: '0 auto', p: { xs: 2, sm: 3 } }}>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#cb0e0e', m: 0  }}>
          Panel del Profesional
        </Typography>
      </Box>
      
      <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, borderRadius: '12px', width: '100%', mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#555' }}>
          Información Profesional
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Box className="grid-datos-personales">
          <div className="dato-bloque">
            <span className="dato-etiqueta">Nombre y Apellido</span>
            <span className="dato-valor">Dr. {medicoData?.nombre} {medicoData?.apellido}</span>
          </div>
          <div className="dato-bloque">
            <span className="dato-etiqueta">Especialidades</span>
              <span className="dato-valor">
                {medicoData?.especialidades?.join(" ")}
              </span>
          </div>
          <div className="dato-bloque">
            <span className="dato-etiqueta">Matrícula Nacional</span>
            <span className="dato-valor">{medicoData?.matricula || 'MN-84920'}</span>
          </div>
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, borderRadius: '12px', width: '100%' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#555' }}>
          Consultorio e Identificaciones
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Box className="grid-datos-personales">
          <div className="dato-bloque">
            <span className="dato-etiqueta">Centros Médicos</span>
            <span className="dato-valor">{medicoData?.sedes?.map(s => s.nombreSede).join(" | ")}</span>
          </div>
          <div className="dato-bloque">
            <span className="dato-etiqueta">ID Profesional</span>
            <span className="dato-valor"># {medicoData?.id}</span>
          </div>
          <div className="dato-bloque">
            <span className="dato-etiqueta">Email Institucional</span>
            <span className="dato-valor">
              {medicoData?.email ? medicoData.email.toLowerCase() : 'sin@email.com'}
            </span>
          </div>
        </Box>
      </Paper>
    </Box>
  );
};

export default InformacionProfesional;