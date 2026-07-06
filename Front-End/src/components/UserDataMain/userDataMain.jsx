import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Divider, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { findObraSocialById, findPlanById } from '../../services/obrasSocialesService';
import { findEspecialidadBymedicoId} from '../../services/medicosService';
const BotonRojo = styled(Button)({
  backgroundColor: 'var(--color-acento)',
  color: 'var(--color-primario)',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  border: 'none',
  textTransform: 'none', 
  fontFamily: 'inherit', 
  fontSize: '1rem',
  boxShadow: 'none', 
  '&:hover': { 
    backgroundColor: '#a00b0b', 
    boxShadow: 'none'
  }
});

const UserDataMain = ({ user, userData }) => {

  const [datosUsuario, setDatosUsuario] = useState({});

  useEffect(() => {
    const cargarDatosPaciente = async () => {
      let data = null;
        const obraSocialPaciente = await findObraSocialById(userData.obraSocialId);
        const planesPaciente = obraSocialPaciente.planes
        data = {
          nombre: userData.nombre,
          dni: userData.dni,
          obraSocial: obraSocialPaciente.nombre,
          planes: planesPaciente.map(p => p.nombrePlan)
        }

        setDatosUsuario(data);
    }

    const cargarDatosMedico = async() => {
      let data = null;
      const especialidadesMedico = await findEspecialidadBymedicoId(user.id);  
      data = {
          nombre: userData.nombre,
          dni: userData.dni,
          matricula: userData.matricula,
          practicas: userData.practicas,
          sedes: userData.sedes,
          especialidades: especialidadesMedico.map(e => e.nombreEspecialidad)
        }

        setDatosUsuario(data);
    };
    (user?.rol == "paciente"? cargarDatosPaciente() : cargarDatosMedico());
  },[user,userData])
  
  return (
    <Box sx={{ width: { xs: '100%', md: '300px' }, flexShrink: 0 }}>
      <Card sx={{ border: '1px solid var(--color-secundario)', boxShadow: 'none' }}>
        <CardContent sx={{ padding: '2rem' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {user?.rol === 'medico' ? 'Mis Datos Profesionales' : 'Mis Datos'}
          </Typography>
          
          <Typography variant="body1" mb={0.5}>
            <strong>
              {user?.rol === 'medico' ? `Dr/a. ${datosUsuario?.nombre}` : datosUsuario?.nombre}
            </strong>
          </Typography>
          
          <Typography variant="body2" color="textSecondary" gutterBottom>
            <strong>DNI:</strong> {datosUsuario?.dni}
          </Typography>

          {user?.rol === 'paciente' ? (
          <>
            <Typography variant="body2" color="textSecondary" mb={1}>
              <strong>ObraSocial:</strong> {datosUsuario?.obraSocial || "No posee"} 
            </Typography>
            
            <Typography variant="body2" color="textSecondary" mb={1}>
              <strong>Planes:</strong> {datosUsuario?.planes?.join(p => {p + " "})} 
            </Typography>
          </>  

        ) : (
            <>
              <Typography variant="body2" color="textSecondary">
                <strong>Matrícula:</strong> {datosUsuario?.matricula}
              </Typography>

              {datosUsuario?.practicas && datosUsuario.practicas.length > 0 && (
                <Box mt={2}>
                  <Typography variant="caption" fontWeight="bold" color="textSecondary" display="block">
                    ESPECIALIDADES:
                  </Typography>
                  <Typography variant="body2" color="textPrimary">
                   {datosUsuario?.especialidades?.join(" ")}
                  </Typography>
                </Box>
              )}

              {datosUsuario?.sedes && datosUsuario.sedes.length > 0 && (
                <Box mt={2} mb={1}>
                  <Typography variant="caption" fontWeight="bold" color="textSecondary" display="block">
                    SEDES DE ATENCIÓN:
                  </Typography>
                  <Typography variant="body2" color="textPrimary">
                    {datosUsuario.sedes.map(s => s.nombreSede).join(' - ')}
                  </Typography>
                </Box>
              )}
            </>
          )}
          
          <Divider sx={{ my: 2 }} />

          <Link to="/perfil" style={{ textDecoration: 'none', display: 'block' }}>
            <BotonRojo variant="contained" fullWidth>Editar Mi Perfil</BotonRojo>
          </Link>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserDataMain;