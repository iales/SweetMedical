const mongoose = require('mongoose');
const { Medico, Especialidad, Practica, Sede, DisponibilidadHoraria, Usuario } = require('../../entities');
const MedicoModel = require('../../../schemas/medicoSchema');
const { MedicoDoesntExistError, DisponibilidadDoesntExistError, MatriculaDuplicadaError} = require('../../../errors/medicos.errors');
const {ObjectDoesntExistError} = require('../../../errors/app.errors')
const {Types} = require('mongoose'); 


class MedicosRepository {

    constructor(){
        this.model = MedicoModel;
    }

    static instance() {
    if (!MedicosRepository._instance) {
      MedicosRepository._instance = new MedicosRepository();
    }
    return MedicosRepository._instance;
    }


    async saveMedico(medico){
        this.validateMedico(medico);
        const nuevoMedico = new this.model(medico);
        
        try {
            return await nuevoMedico.save();
        } catch (error) {
            // Atrapamos el error específico de MongoDB para clave duplicada
            if (error.code === 11000) {
                throw new MatriculaDuplicadaError('La matrícula ingresada ya existe.'); 
            }
            // Si es otro error de la base de datos, lo dejamos seguir
            throw error;
        }
    }

    async findMedicos(){
        return await this.model.find();
    }
 
    async findById(id){
        if(!mongoose.Types.ObjectId.isValid(id)) {
            throw new ObjectDoesntExistError(); 
        }
        return await this.model.findById(id);
    }

    async findByUsuarioId(usuarioId){    
        return await this.model.findOne({usuarioId: usuarioId});
    }

    async updateMedico(medico) {
    return await this.model.findByIdAndUpdate(medico.id,
        { practicas: medico.practicas,
          disponibilidades: medico.disponibilidades},
        { new: true }
        );
    }
   
    async deleteDisponibilidadByID(medicoId,disponibilidadId){
        return await this.model.findByIdAndUpdate(medicoId,
        { 
            $pull: { 
                disponibilidades: { _id: new Types.ObjectId(disponibilidadId)} 
            } 
        },
        { returnDocument: 'after' }
        );
    }

    async findMedicosByPracticaId(practicaId){
        return await this.model.find({"practicas.practicaId": new mongoose.Types.ObjectId(practicaId)})
        
    }


     validateMedico(medico) {
        if (!(medico instanceof Medico)) {
            throw new Error('El medico es invalido');
        }
     }

}

module.exports = MedicosRepository;