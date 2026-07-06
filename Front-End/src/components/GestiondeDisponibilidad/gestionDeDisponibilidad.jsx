import React, { useState } from "react";
import { 
  Typography, Dialog, DialogTitle, DialogContent, DialogActions, 
  Box, TextField, MenuItem, Button, Divider, List, ListItem, ListItemText, IconButton 
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const GestionDeDisponibilidad = ({ open, onClose, disponibilidades, onAgregarHorario, onEliminarHorario }) => {
  const [nuevoHorario, setNuevoHorario] = useState({
    diaSemana: '',
    horaDesde: '',
    horaHasta: ''
  });

  const diasDeLaSemana = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];

  const handleAgregar = () => {
    if (!nuevoHorario.diaSemana || !nuevoHorario.horaDesde || !nuevoHorario.horaHasta) {
      alert("Por favor completá todos los campos del horario.");
      return;
    }
    onAgregarHorario(nuevoHorario);

    setNuevoHorario({ diaSemana: '', horaDesde: '', horaHasta: '' });
  };

const generarHorarios = () => {
  const horarios = [];
  for (let i = 8; i <= 20; i++) {
    const hora = i < 10 ? `0${i}` : `${i}`;
    horarios.push(`${hora}:00`);
    horarios.push(`${hora}:30`);
  }
  return horarios;
};

const listaHorarios = generarHorarios();

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm" 
      fullWidth
    >
      <DialogTitle sx={{ fontWeight: 'bold', color: '#cb0e0e' }}>
        Gestionar Disponibilidad Horaria
      </DialogTitle>
      
      <DialogContent dividers>
        <Typography variant="subtitle2" sx={{ mb: 1, color: '#555', fontWeight: 'bold' }}>
          Agregar Nuevo Horario
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center' }}>
          <TextField
            select
            label="Día"
            size="small"
            fullWidth
            value={nuevoHorario.diaSemana}
            onChange={(e) => setNuevoHorario({ ...nuevoHorario, diaSemana: e.target.value })}
          >
            {diasDeLaSemana.map((dia) => (
              <MenuItem key={dia} value={dia}>{dia}</MenuItem>
            ))}
          </TextField>
          
        <TextField
            select
            label="Desde"
            size="small"
            fullWidth
            value={nuevoHorario.horaDesde}
            onChange={(e) => setNuevoHorario({ ...nuevoHorario, horaDesde: e.target.value })}
        >
        {listaHorarios.map((hora) => (
            <MenuItem key={`desde-${hora}`} value={hora}>{hora}</MenuItem>
        ))}
        </TextField>

        <TextField
            select
            label="Hasta"
            size="small"
            fullWidth
            value={nuevoHorario.horaHasta}
            onChange={(e) => setNuevoHorario({ ...nuevoHorario, horaHasta: e.target.value })}
        >
        {listaHorarios.map((hora) => (
            <MenuItem key={`hasta-${hora}`} value={hora}>{hora}</MenuItem>
        ))}
        </TextField>
                
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleAgregar}
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
          >
            Agregar
          </Button>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle2" sx={{ mb: 2, color: '#555', fontWeight: 'bold' }}>
          Horarios Actuales
        </Typography>
        
        {!disponibilidades || disponibilidades.length === 0 ? (
          <Typography variant="body2" color="text.secondary">No hay horarios registrados.</Typography>
        ) : (
          <List sx={{ p: 0 }}>
            {disponibilidades.map((disp,index) => (
              <ListItem 
                key={disp.id || disp._id || index}
                sx={{ border: '1px solid #eee', borderRadius: '8px', mb: 1 }}
                secondaryAction={
                  <IconButton edge="end" color="error" onClick={() => onEliminarHorario(disp.id || disp._id )}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText 
                  primary={`${disp.diaSemana}`} 
                  secondary={`${disp.horaDesde} hs a ${disp.horaHasta} hs`}
                  primaryTypographyProps={{ fontWeight: 'bold' }}
                />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} sx={{ color: '#555' }}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GestionDeDisponibilidad;