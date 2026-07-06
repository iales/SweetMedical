import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, Drawer } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import ImagenPerfil from '../ImagenPerfil/imagenPerfil'; // Ajustá la ruta si es distinta

const SectionBar = ({ usuario, opciones, seccionActiva, alCambiarSeccion }) => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();

  const renderContenidoMenu = () => (

    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, p: 2 }}>
      

      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
        <IconButton onClick={() => navigate(-1)} title="Volver atrás" sx={{ color: 'white' }}>
          <ArrowBackIcon />
        </IconButton>
      </Box>

    
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
        <ImagenPerfil imagenPerfil={usuario?.foto} />
        <Typography variant="h6" align="center" sx={{ color: 'white', fontWeight: 'bold', mt: 2 }}>
          {usuario?.nombre} {usuario?.apellido}
        </Typography>
        <Typography variant="body2" align="center" sx={{ color: '#ffcccc' }}>
          {usuario?.tipo}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1, overflowY: 'auto', mt: 2, mb: 2 }}>
        {opciones.map((opcion) => {
          const isActive = seccionActiva === opcion.id;
          
          return (
            <Button
              key={opcion.id}
              onClick={() => {
                alCambiarSeccion(opcion.id); 
                setMenuAbierto(false); 
              }}
              startIcon={opcion.icono}
              sx={{
                justifyContent: 'flex-start',
                textTransform: 'none',
                fontWeight: 'bold',
                px: 2,
                py: 1.5,
                borderRadius: '8px',
                color: isActive ? '#cb0e0e' : 'white', 
                backgroundColor: isActive ? 'white' : 'transparent',
                '&:hover': {
                  backgroundColor: isActive ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              {opcion.nombre}
            </Button>
          );
        })}
      </Box>

      <Button 
        onClick={() => navigate('/')}
        fullWidth
        sx={{
          mt: 'auto', 
          flexShrink: 0,
          backgroundColor: 'white',
          color: '#cb0e0e',
          fontWeight: 'bold',
          textTransform: 'none',
          borderRadius: '8px',
          py: 1.5,
          '&:hover': { backgroundColor: '#f0f0f0' }
        }}
      >
        🚪 Cerrar Sesión
      </Button>
    </Box>
  );

  return (
    <>
     <Box 
        sx={{ 
          display: { xs: 'none', md: 'flex' }, 
          flexDirection: 'column',
          width: '280px', 
          flexShrink: 0, 
          height: '100%', 
          backgroundColor: 'var(--color-acento, #cb0e0e)', 
          boxShadow: '4px 0 10px rgba(0,0,0,0.1)'
        }}
      >
        {renderContenidoMenu()}
      </Box>

      <Box 
        sx={{ 
          display: { xs: 'flex', md: 'none' }, 
          alignItems: 'center', 
          backgroundColor: 'var(--color-acento, #cb0e0e)', 
          p: 1,
          color: 'white'
        }}
      >
        <IconButton onClick={() => setMenuAbierto(true)} sx={{ color: 'white' }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 'bold', ml: 1 }}>
          Mi Panel
        </Typography>
      </Box>

      
      <Drawer
        anchor="left"
        open={menuAbierto}
        onClose={() => setMenuAbierto(false)}
        PaperProps={{ 
          sx: { 
            width: '280px', 
            backgroundColor: 'var(--color-acento, #cb0e0e)' 
          } 
        }}
      >
        {renderContenidoMenu()}
      </Drawer>
    </>
  );
};

export default SectionBar;