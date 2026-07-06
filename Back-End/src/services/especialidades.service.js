const EspecialidadesRepository = require('../domain/clients/repositories/especialidades.repository');
const {ObjectDoesntExistError} = require('../errors/app.errors');
const {Sede, Especialidad} = require('../domain/entities');

class EspecialidadesService {

    constructor() {
        this.especialidadesRepository = EspecialidadesRepository.instance();
    }

    static instance() {
    if (!EspecialidadesService._instance) {
      EspecialidadesService._instance = new EspecialidadesService();
    }
    return EspecialidadesService._instance;
}

    toDTO(especialidad){
        return{
            id: especialidad.id || especialidad._id,
            nombre: especialidad.nombre,
            descripcion: especialidad.descripcion
        }
    }


    async createEspecialidad(especialidadData){
        const especialidad = new Especialidad(
            especialidadData.nombre,
            especialidadData.descripcion);
        
        const especialidadGuardada = await this.especialidadesRepository.saveEspecialidad(especialidad); 
        return this.toDTO(especialidadGuardada);
    } 

    async findById(id){
    
        const especialidad = await this.especialidadesRepository.findById(id);
        if (!especialidad){
            throw new ObjectDoesntExistError();
        }
        return this.toDTO(especialidad);
    }

    async findEspecialidades(){
        const especialidades = await this.especialidadesRepository.findEspecialidades();
        return especialidades.map(e => this.toDTO(e));
    }

    async deleteEspecialidad(id){

        const especialidadEliminada = await this.especialidadesRepository.deleteEspecialidad(id);
        if (!especialidadEliminada){
            throw new ObjectDoesntExistError();
        }
    }


}

module.exports = EspecialidadesService;