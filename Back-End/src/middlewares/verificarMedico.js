const jwt = require('jsonwebtoken');

const verificarMedico = (req, res, next) => {

  if (!req.user) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  if (req.user.rol !== 'medico') {
    return res.status(403).json({ error: 'Acceso restringido a médicos' });
  }

  next();
}


module.exports = { verificarMedico };