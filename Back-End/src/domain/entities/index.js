
// Este archivo se va a utilizar para poder exportar todas las clases con un unico require.

const TrazabilidadEstadoTurno = require('./trazabilidadEstadoTurno.js');
const CoberturaPractica = require('./coberturaPractica');
const DiaSemana = require('./diaSemana.js');
const DisponibilidadHoraria = require('./disponibilidadHoraria.js');
const Especialidad = require('./especialidad.js');
const EstadoTurno = require('./estadoTurno.js');
const Medico = require('./medico.js');
const Notificacion = require('./notificacion.js');
const ObraSocial = require('./obraSocial.js');
const Paciente = require('./paciente.js');
const Plan = require('./plan.js');
const Practica = require('./practica');
const Sede = require('./sede.js');
const Turno = require('./turno.js');
const Usuario = require('./usuario.js');
const FiltroPorEspecialidad = require("./filtros/filtroPorEspecialidad.js");
const FiltroPorMedico = require("./filtros/filtroPorMedico.js");
const FiltroPorSede = require("./filtros/filtroPorSede.js");
const FiltroPorPractica = require("./filtros/filtroPorPractica.js");
const FiltroPorFecha = require("./filtros/filtroPorFecha.js");
const NivelCobertura = require("./nivelCobertura.js");

module.exports = {
    TrazabilidadEstadoTurno,
    CoberturaPractica,
    DiaSemana,
    DisponibilidadHoraria,
    Especialidad,
    EstadoTurno,
    Medico,
    ObraSocial,
    Paciente,
    Plan,
    Practica,
    Sede,
    Turno,
    Usuario,
    FiltroPorEspecialidad,
    FiltroPorFecha, 
    FiltroPorMedico,
    FiltroPorPractica,
    FiltroPorSede,
    NivelCobertura
}