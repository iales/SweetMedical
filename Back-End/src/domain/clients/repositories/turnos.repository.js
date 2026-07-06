const { Turno, CambioEstadoTurno, TrazabilidadEstadoTurno, EstadoTurno } = require('../../entities');
const {TurnoDoesntExistError} = require('../../../errors/turnos.errors');
const {ObjectDoesntExistError} = require('../../../errors/app.errors');
const TurnoModel = require('../../../schemas/turnoSchema');
const mongoose = require('mongoose');


class TurnosRepository {

    constructor() {
        this.model = TurnoModel;
    }

    static instance() {
        if (!TurnosRepository._instance) {
            TurnosRepository._instance = new TurnosRepository();
        }
        return TurnosRepository._instance;
    }

   async saveTurno(turno) {
        this.validateTurno(turno);
        const nuevoTurno = this.model(turno);
        return await nuevoTurno.save();
        
   }

    async findTurnos() {
        return await this.model.find();
    }


    async findById(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ObjectDoesntExistError(); 
        }
                        
        return await this.model.findById(id);
    }

    async findTurnosActivosByMedicoId(id) {
         if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ObjectDoesntExistError(); 
        }
        return await TurnoModel.find({
                medicoId: id,
                estado: {
                    $in: [
                        EstadoTurno.RESERVADO,
                        EstadoTurno.ESPERANDO_CONFIRMACION
                    ]
                }
        })

    }

    async findTurnosByPacienteId(id){
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ObjectDoesntExistError(); 
        }
        return await TurnoModel.find({
                pacienteId: id                     // ACLARACION: no se si esto funciona
        })
    }

    async findTurnosByMedicoId(id){
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ObjectDoesntExistError(); 
        }
        return await TurnoModel.find({
                medicoId: id
        })
    }


    async updateTurno(turno) {
        return await this.model.findByIdAndUpdate(
        turno.id,
        {
        usuarioId: turno.usuarioId,
        pacienteId: turno.pacienteId,
        fechaHora: turno.fechaHora,
        sedeId: turno.sedeId,
        practicaId: turno.practicaId,
        nombrePractica: turno.nombrePractica,
        duracionEnMins: turno.duracionEnMins,
        estado: turno.estado,
        costo: turno.costo,
        historialEstados: turno.historialEstados
        },
        { new: true }
    );
    }

 


    // Validaciones adicionales

    validateTurno(turno) {
        if (!(turno instanceof Turno)) {
            throw new Error("Turno invalido");
        }
    }


}

module.exports = TurnosRepository;