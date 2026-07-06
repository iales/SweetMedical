const PacientesRepository = require('../domain/clients/repositories/pacientes.repository');
const {Paciente} = require('../domain/entities');
const ObrasSocialesService = require('./obrasSociales.service');
const {ObjectDoesntExistError} = require('../errors/app.errors');
class PacientesService{
    
    constructor(){
        this.pacientesRepository = PacientesRepository.instance();
        this.obrasSocialesService = ObrasSocialesService.instance();
    }
    static instance() {
    if (!PacientesService._instance) {
      PacientesService._instance = new PacientesService();
    }
    return PacientesService._instance;
    }


    toDTO(paciente){

         if (!paciente) return null;

        return{
            id: paciente.id || paciente._id,
            usuarioId: paciente.usuarioId,
            dni: paciente.dni,
            nombre: paciente.nombre,
            obraSocialId: paciente.obraSocialId,
            planId: paciente.planId
        }
    }

    async createPaciente(pacienteData){

        const obraSocial = await this.obrasSocialesService.findById(pacienteData.obraSocialId);
        const plan = await this.obrasSocialesService.findPlanById(pacienteData.planId);
        
        console.log(obraSocial);
         console.log(plan);
        
       if (!obraSocial || !plan  || !obraSocial.planes.some(p => p.planId.toString() === plan.id.toString())) {
        throw new ObjectDoesntExistError();
       }


        const paciente = new Paciente(
            pacienteData.usuarioId,
            pacienteData.dni,
            pacienteData.nombre,
            pacienteData.obraSocialId,
            pacienteData.planId
        );

        const pacienteNuevo = await this.pacientesRepository.savePaciente(paciente);
        return this.toDTO(pacienteNuevo);
    }

    async findById(id){
        const paciente = await this.pacientesRepository.findById(id);
        return this.toDTO(paciente);
    }

    async findByUsuarioId(usuarioId){
        const paciente = await this.pacientesRepository.findByUsuarioId(usuarioId);
        return this.toDTO(paciente);
    }

    async findPacientes(){
        const pacientes = await this.pacientesRepository.findPacientes();
        return pacientes.map(p => this.toDTO(p));
    }
}

module.exports = PacientesService