const jwt = require('jsonwebtoken');

const verificarPaciente = (req, res, next) => {

  if (!req.user) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  if (req.user.rol !== 'paciente') {
    return res.status(403).json({ error: 'Acceso restringido a pacientes' });
  }

  next();
}


module.exports = { verificarPaciente };