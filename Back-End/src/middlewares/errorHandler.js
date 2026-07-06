const {MedicoDoesntExistError, DisponibilidadDoesntExistError, MatriculaDuplicadaError, PracticaYaAsignadaError, DiaSemanaInvalido, ColisionDeDisponibilidad} = require("../errors/medicos.errors")
const {TurnoDoesntExistError, DisponibilidadNotAvailableError, ModificacionNotPossibleError, InvalidDataError} = require("../errors/turnos.errors")
const {EmailDuplicadoError, CredencialesInvalidasError} = require('../errors/usuarios.errors');
const {ObjectDoesntExistError} = require('../errors/app.errors');

function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }

    if (err instanceof MedicoDoesntExistError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            timestamp: err.timestamp,
        })
    }

     if (err instanceof DisponibilidadDoesntExistError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            timestamp: err.timestamp,
        })
    }

     if (err instanceof PracticaYaAsignadaError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            timestamp: err.timestamp,
        })
    }

     if (err instanceof TurnoDoesntExistError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            timestamp: err.timestamp,
        })
    }

     if (err instanceof DisponibilidadNotAvailableError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            timestamp: err.timestamp,
        })
    }

     if (err instanceof ModificacionNotPossibleError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            timestamp: err.timestamp,
        })
    }

      if (err instanceof InvalidDataError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            timestamp: err.timestamp,
        })
    }

    if (err instanceof MatriculaDuplicadaError) {
        return res.status(err.statusCode).json({
            status: err.status, 
            message: err.message,
            timestamp: err.timestamp,
        })
    }

    if (err instanceof ObjectDoesntExistError){
         return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            timestamp: err.timestamp,
        })
    }

    if(err instanceof CredencialesInvalidasError){
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            timestamp:err.timestamp
        })
    }

    if(err instanceof EmailDuplicadoError){
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            timestamp:err.timestamp
        })
    }

    if(err instanceof DiaSemanaInvalido){
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            timestamp: err.timestamp
        })
    }
    if(err instanceof ColisionDeDisponibilidad){
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            timestamp: err.timestamp
        })
    }

    return res.status(500).json({
        status: "error",
        message: "Error interno del servidor",
        timestamp: new Date().toISOString(),
    })
}

module.exports = {errorHandler};