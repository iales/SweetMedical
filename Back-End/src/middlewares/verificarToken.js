const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  // 1. Buscamos el header 'authorization' (Express lo lee todo en minúsculas)
  const authHeader = req.headers['authorization'];
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({                           // Definir un error 401
      status: "error", 
      message: "Acceso denegado. No se proporcionó un token válido." 
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    // 3. Verificamos la firma criptográfica usando la CLAVE SECRETA del back
    const tokenVerificado = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Inyectamos los datos del token en el objeto 'req' 
    req.user = tokenVerificado; 
    next(); 

  } catch (error) {
    return res.status(403).json({                   // // Definir un error 403
      status: "error", 
      message: "Token inválido o expirado." 
    });
  }
};

module.exports = { verificarToken };