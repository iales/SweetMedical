import React , {useState, useEffect} from 'react';
import { 
  Box, Typography, Paper, Divider, List, ListItem, ListItemText, Button, 
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, IconButton 
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'; 
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime'; 
import './agendaTurnos.css';
import { findSedes } from '../../services/sedesService';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { createDisponibilidad, deleteDisponibilidad } from '../../services/medicosService';
import GestionDeDisponibilidad from '../GestiondeDisponibilidad/gestionDeDisponibilidad';

const AgendaTurnos = ({medicoId ,disponibilidades, datosSedes, onActualizarAgenda}) => {
  

  const [sedes, setSedes] = useState([]);
  const [openModalHorarios, setOpenModalHorarios] = useState(false);

  const handleAgregarHorario = async (horarioRecibido) => {
    try {
      await createDisponibilidad(medicoId, horarioRecibido);
      if (onActualizarAgenda) onActualizarAgenda();

    } catch (error) {
      alert("Hubo un error al guardar el horario.");
    }
  };

  const handleEliminarHorario = async (disponibilidadId) => {
    if(window.confirm("¿Estás seguro de eliminar este horario?")) {
      try {
        await deleteDisponibilidad(medicoId, disponibilidadId);
        if (onActualizarAgenda) onActualizarAgenda();
      } catch (error) {
        alert("Hubo un error al eliminar el horario.");
      }
    }
  };

  useEffect(() => {
    const cargarSedes = async () => {
      const datosSedesback = await findSedes();
      const sedesFiltradas = filtrarSedes(datosSedesback);
      setSedes(sedesFiltradas);

    }

   const filtrarSedes = (sedesBack) => {
    return sedesBack.filter(sb => !datosSedes?.some(sf => sb.id === sf.id));
   }

    cargarSedes()
  },[datosSedes])
  return (
    <Box sx={{ width: '100%', maxWidth: '1000px', margin: '0 auto', p: { xs: 2, sm: 3 } }}>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#cb0e0e', m: 0 }}>
          Gestión de Agenda
        </Typography>
      </Box>

      <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, borderRadius: '12px', width: '100%', mb: 4 }}>    
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarMonthIcon sx={{ color: '#555' }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#555', m: 0 }}>
                  Horarios de Atención Semanal
                </Typography>
              </Box>
              
              <Button 
                variant="outlined" 
                size="small" 
                startIcon={<EditIcon />}
                sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 'bold', color: '#1976d2', borderColor: '#1976d2' }}
                onClick={() => setOpenModalHorarios(true)} 
              >
                Modificar Horarios
              </Button>
            </Box>
            
            <Divider sx={{ mb: 2 }} />

        {!disponibilidades || disponibilidades.length === 0 ? (
          <Typography variant="body1" sx={{ color: 'grey.500', fontStyle: 'italic' }}>
            El profesional no registra disponibilidades horarias activas.
          </Typography>
        ) : (
          <List sx={{ p: 0 }}>
            {disponibilidades.map((disp, index) => (
              <React.Fragment key={index}>
                <ListItem 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    py: 1.5,
                    px: 1
                  }}
                >
                  <ListItemText 
                    primary={disp.diaSemana} 
                    primaryTypographyProps={{ 
                      sx: { fontWeight: 'bold', color: '#222', fontSize: '1.1rem' } 
                    }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} className="agenda-horario-badge">
                    <AccessTimeIcon sx={{ fontSize: '1.1rem', color: '#1976d2' }} />
                    <Typography variant="body1" sx={{ fontWeight: 500, color: '#1976d2' }}>
                      {disp.horaDesde} hs a {disp.horaHasta} hs
                    </Typography>
                  </Box>
                </ListItem>
                {index < disponibilidades.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>
        
      <GestionDeDisponibilidad 
        open={openModalHorarios}
        onClose={() => setOpenModalHorarios(false)}
        disponibilidades={disponibilidades}
        onAgregarHorario={handleAgregarHorario}
        onEliminarHorario={handleEliminarHorario}
      />

      <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, borderRadius: '12px', width: '100%' }}>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BusinessIcon sx={{ color: '#555' }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#555', m: 0 }}>
              Sedes de Atención Habilitadas
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {!sedes || sedes.length === 0 ? (
          <Typography variant="body1" sx={{ color: 'grey.500', fontStyle: 'italic' }}>
            No hay sedes asignadas a este profesional.
          </Typography>
        ) : (
          <div className="agenda-sedes-grid">
            {sedes.map((sede) => (
              <div key={sede.id} className="agenda-sede-card">
                <div className="agenda-sede-header">
                  <BusinessIcon className="agenda-sede-icon-building" />
                  <Typography variant="subtitle1" className="agenda-sede-nombre">
                    {sede.nombre}
                  </Typography>
                </div>
                
                <div className="agenda-sede-body">
                  <LocationOnIcon className="agenda-sede-icon-pin" />
                  <span className="agenda-sede-direccion">
                    {sede.direccion || 'Dirección no disponible'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Paper>
    </Box>
  );
};

export default AgendaTurnos;
