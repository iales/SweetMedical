import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, Divider, List, ListItem, ListItemText, 
  Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, 
  FormControl, InputLabel, Select, MenuItem, Chip, Stack 
} from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {  findAllPracticas } from '../../services/practicasService';
import { addPractica, removePractica } from '../../services/medicosService';
import { alignProperty } from '@mui/material/styles/cssUtils';

const PracticasSection = ({ medicoId, practicasAsignadas, onActualizarPerfil }) => {
  const [openModal, setOpenModal] = useState(false);
  const [todasLasPracticas, setTodasLasPracticas] = useState([]);
  const [practicaSeleccionada, setPracticaSeleccionada] = useState('');

  useEffect(() => {
    const cargarCatalogo = async () => {
      try {
        const data = await findAllPracticas(); 
        setTodasLasPracticas(data);
      } catch (error) {
        console.error("Error al cargar el catálogo de prácticas:", error);
      }
    };
    cargarCatalogo();
  }, []);

  const practicasDisponibles = todasLasPracticas.filter(
    (p) => !practicasAsignadas?.some((asignada) => asignada.practicaId === (p.id || p._id))
  );

  const handleAgregar = async () => {
    if (!practicaSeleccionada) return;
    
    try {
      await addPractica(medicoId, practicaSeleccionada);
      setPracticaSeleccionada('');
      setOpenModal(false);
      
      if (onActualizarPerfil) onActualizarPerfil();
    } catch (error) {
      alert("Hubo un error al agregar la práctica.");
      console.error(error);
    }
  };

  const handleEliminar = async (practicaId) => {
    if (window.confirm("¿Estás seguro de remover esta práctica de tu perfil?")) {
      try {
        await removePractica(medicoId, practicaId);
        if (onActualizarPerfil) onActualizarPerfil();
      } catch (error) {
        alert("Hubo un error al remover la práctica.");
        console.error(error);
      }
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '1000px', margin: '0 auto', p: { xs: 2, sm: 3 } }}> 
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#cb0e0e', m: 0 }}>
          Gestión de Prácticas
        </Typography>
      </Box>

      <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, borderRadius: '12px', width: '100%' }}>
        <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            justifyContent: 'space-between', 
            alignItems: { xs: 'flex-start', sm: 'center' }, 
            gap: { xs: 2, sm: 0 }, 
            mb: 2 
          }}>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MedicalServicesIcon sx={{ color: '#555' }} aria-hidden="true" />
            <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: '#555', m: 0 }}>
              Prácticas Médicas
            </Typography>
          </Box>
          
          <Button 
            variant="outlined" 
            size="small" 
            startIcon={<AddCircleOutlineIcon />}
            aria-label="Agregar nueva práctica" 
            sx={{ 
              borderRadius: '8px', 
              textTransform: 'none', 
              fontWeight: 'bold', 
              color: '#1976d2', 
              borderColor: '#1976d2',
              width: { xs: '100%', sm: 'auto' } 
            }}
            onClick={() => setOpenModal(true)}
          >
            Agregar Práctica
          </Button>
        </Box>
        
        <Divider sx={{ mb: 2 }} />

        {!practicasAsignadas || practicasAsignadas.length === 0 ? (
          <Typography variant="body1" sx={{ color: 'grey.500', fontStyle: 'italic' }}>
            El profesional aún no tiene prácticas registradas.
          </Typography>
        ) : (
          <List sx={{ p: 0 }}>
            {practicasAsignadas.map((asignada) => {
              const datosCompletos = todasLasPracticas.find(p => (p.id || p._id) === asignada.practicaId) || {};

              return (
                <ListItem 
                  key={asignada.practicaId} 
                  sx={{ 
                    border: '1px solid #eee', 
                    borderRadius: '8px', 
                    mb: 1.5, 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    p: { xs: 1.5, sm: 2 } 
                  }}
                  secondaryAction={
                    <IconButton 
                      edge="end" 
                      color="error" 
                      onClick={() => handleEliminar(asignada.practicaId)}
                      aria-label={`Eliminar práctica ${datosCompletos.nombre}`} 
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, width: '100%', pr: 4 }}>
                    
                    <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 'bold', color: '#222', alignItems: 'left' }}>
                      <span aria-hidden="true">🩺</span> {datosCompletos.nombre || 'Cargando...'}
                    </Typography>
                    
                    <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                      Especialidad: {datosCompletos.nombreEspecialidad || 'No definida'}
                    </Typography>
                    
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 0.5 }}>
                      <Chip 
                        icon={<AccessTimeIcon fontSize="small" />} 
                        label={`${datosCompletos.duracionTurnoEnMins || 0} min`} 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                        aria-label={`Duración: ${datosCompletos.duracionTurnoEnMins || 0} minutos`} 
                        sx={{ fontWeight: 'bold', mb: { xs: 1, sm: 0 } }} 
                      />
                      <Chip 
                        icon={<AttachMoneyIcon fontSize="small" />} 
                        label={`$${datosCompletos.costo || 0}`} 
                        size="small" 
                        color="success" 
                        variant="outlined"
                        aria-label={`Costo: ${datosCompletos.costo || 0} pesos`} 
                        sx={{ fontWeight: 'bold' }}
                      />
                    </Stack>
                  </Box>

                </ListItem>
              )
            })}
          </List>
        )}
      </Paper>

      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth aria-labelledby="dialog-title">
        <DialogTitle id="dialog-title" sx={{ fontWeight: 'bold', color: '#333' }}>
          Asignar Nueva Práctica
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ mt: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="select-practica-label">Seleccionar Práctica</InputLabel>
            <Select
                labelId="select-practica-label"
                value={practicaSeleccionada || ''}
                label="Seleccionar Práctica"
                onChange={(e) => setPracticaSeleccionada(e.target.value)}
                >
                {practicasDisponibles.length === 0 ? (
                    <MenuItem value="" disabled>No hay prácticas nuevas disponibles</MenuItem>
                ) : (
                    practicasDisponibles.map((p) => (
                    <MenuItem key={p.id || p._id} value={p.id || p._id}>
                        {p.nombre} {p.nombreEspecialidad ? `(${p.nombreEspecialidad})` : ''}
                    </MenuItem>
                    ))
                )}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpenModal(false)} color="inherit" sx={{ textTransform: 'none' }}>
            Cancelar
          </Button>
          <Button 
            onClick={handleAgregar} 
            variant="contained" 
            disabled={!practicaSeleccionada}
            sx={{ textTransform: 'none', borderRadius: '8px' }}
          >
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PracticasSection;