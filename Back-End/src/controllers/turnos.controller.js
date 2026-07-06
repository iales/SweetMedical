const TurnosService = require('../services/turnos.service');
const { TurnoDoesntExistError, DisponibilidadNotAvailableError, InvalidDataError, ModificacionNotPossibleError } = require('../errors/turnos.errors');

class TurnosController {

    constructor(){
        this.turnosService = TurnosService.instance();
    }

    static instance() {
        if (!TurnosController._instance) {
        TurnosController._instance = new TurnosController();
        }
        return TurnosController._instance;
    }

    async findTurnosByPacienteRequirements(req, res, next) {
        try {

            const pacienteId = req.user.id;
            const criteriosBusqueda = {pacienteId, ...req.query }

            const turnos = await this.turnosService.findTurnosByPacienteRequirements(criteriosBusqueda);
            return res.status(200).json(turnos);
        } catch (error) {
            return next(error);
        }
    }

    async findTurnos(res, next) {
        try {
            const turnos = await this.turnosService.findTurnos();
            return res.status(200).json(turnos);
        } catch (error) {
            return next(error);
        }
    }

    async findMisTurnos(req, res, next) {
        try {
            const turnos = await this.turnosService.findMisTurnos(req.user);
            return res.status(200).json(turnos);
        } catch (error) {
            return next(error);
        }
    }

    async findById(req, res, next) {
        try {
            const turno = await this.turnosService.findById(req.params.id);
            return res.status(200).json(turno);
        } catch (error) {
            return next(error);
        }
    }

    async createTurno(req, res, next) {
        try {

            const pacienteId = req.user.id;
            const turnoData = {pacienteId, ...req.body}
            const turno = await this.turnosService.createTurno(turnoData);
            return res.status(201).json(turno);
        } catch (error) {
            console.log("Error Real: " + error); 
            return next(error);
        }
    }

    async findHorariosDisponiblesParaModificar(req, res, next) {
        try {
            const horarios = await this.turnosService.findHorariosDisponiblesParaModificar(
                req.params.id,
                req.query.fecha
            );
            return res.status(200).json(horarios);
        } catch (error) {
            return next(error);
        }
    }
    async updateTurno(req, res, next) {
       try {
            const turno = await this.turnosService.updateTurno(req.params.id, req.body);
            return res.status(201).json(turno);
       } catch (error) {
           return next(error);
        }
    }

    async deleteTurno(req, res, next) {
        try {
            await this.turnosService.deleteTurno(req.params.id, req.body.motivo);
            return res.status(204).send();
        } catch (error) {
            return next(error);
        }
    }

    async confirmarTurno(req, res, next) {
        try {
            const turno = await this.turnosService.confirmarTurno(req.params.id);
            return res.status(200).json(turno);
        } catch (error) {
            return next(error);
        }
    }

    async findTurnosByPacienteId(req, res, next) {
        try {
            const turnos = await this.turnosService.findTurnosByPacienteId(req.params.id);
            return res.status(200).json(turnos);
        } catch (error) {
            return next(error);
        }
    }

    async findTurnosActivosByMedicoId(req,res,next){
        try{
            const turnos = await this.turnosService.findTurnosActivosByMedicoId(req.params.id);
            return res.status(200).json(turnos);
        }catch (error){
            return next(error);
        }
    }
    
}

module.exports = TurnosController;