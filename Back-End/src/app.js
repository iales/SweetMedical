const express = require('express');
const cors = require('cors');    // mecanismo de seguridad HTTP
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const swaggerSpec = YAML.load(path.join(__dirname,'docs','swagger.yaml')); 

const healthcheckRouter = require('./routes/healthcheck.router');
const medicosRouter = require('./routes/medicos.router');
const turnosRouter = require('./routes/turnos.router');
const pacientesRouter = require('./routes/pacientes.router');
const sedesRouter = require('./routes/sedes.router');
const especialidadesRouter = require('./routes/especialidades.router');
const practicasRouter = require('./routes/practicas.router');
const usuariosRouter = require('./routes/usuarios.router');
const obrasSocialesRouter = require('./routes/obrasSociales.router');
const notificacionesRouter = require('./routes/notificaciones.router');

const {notFoundHandler} = require("./middlewares/notFoundHandler");
const {errorLogger} = require('./middlewares/errorLogger');
const {errorHandler} = require('./middlewares/errorHandler');


const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URI, 
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}));
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));
app.use(healthcheckRouter);
app.use(sedesRouter);
app.use(especialidadesRouter);
app.use(medicosRouter);
app.use(turnosRouter);
app.use(pacientesRouter);
app.use(practicasRouter);
app.use(usuariosRouter);
app.use(obrasSocialesRouter);
app.use(notificacionesRouter);


app.use(notFoundHandler);
app.use(errorLogger);
app.use(errorHandler);





module.exports = app;
