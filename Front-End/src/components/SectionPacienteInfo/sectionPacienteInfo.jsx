import React from "react";
import { Paper, Typography, Divider, Box, Chip } from "@mui/material";
import './sectionPacienteInfo.css';

const SectionPacienteInfo = ({ usuarioData, obraSocialAsociada, planAsociado }) => {
  return (
    <Box sx={{ width: '100%' }}>
      
      <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, borderRadius: '12px', width: '100%', mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#555' }}>
          Información Personal
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Box className="grid-datos-personales">
          <div className="dato-bloque">
            <span className="dato-etiqueta">Nombre y Apellido</span>
            <span className="dato-valor">{usuarioData?.nombre} {usuarioData?.apellido}</span>
          </div>
          <div className="dato-bloque">
            <span className="dato-etiqueta">ID Paciente </span>
            <span className="dato-valor"># {usuarioData?.id}</span>
          </div>
          <div className="dato-bloque">
            <span className="dato-etiqueta">Correo Electrónico</span>
            <span className="dato-valor">{usuarioData?.email}</span>
          </div>
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, borderRadius: '12px', width: '100%' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#555' }}>
          Cobertura Médica
        </Typography>
        
        <Divider sx={{ mb: 2 }} />

        <Box className="grid-datos-personales">
          <div className="dato-bloque">
            <span className="dato-etiqueta">Obra Social</span>
            <span className="dato-valor">{obraSocialAsociada?.nombre || 'No especificada'}</span>
          </div>
          <div className="dato-bloque">
            <span className="dato-etiqueta">Plan</span>
            <span className="dato-valor">{planAsociado?.nombrePlan || 'S/N'}</span>
          </div>
          <div className="dato-bloque">
            <span className="dato-etiqueta">Estado de Plan</span>
            
            <Chip 
              label="Activo" 
              color="success" 
              size="small" 
              variant="outlined"
              sx={{ fontWeight: 'bold', width: 'fit-content', mt: 0.5 }} 
            />
          </div>
        </Box>
      </Paper>
      
    </Box>
  );
};

export default SectionPacienteInfo;