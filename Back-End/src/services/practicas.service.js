const PracticasRepository = require('../domain/clients/repositories/practicas.repository');
const {Practica, CoberturaPractica} = require('../domain/entities');
const EspecialidadesService = require('./especialidades.service');
const {ObjectDoesntExistError} = require('../errors/app.errors');


class PracticasService {
    constructor(){
        this.practicasRepository = PracticasRepository.instance();
        this.especialidadesService = EspecialidadesService.instance();
    }

    static instance() {
        if (!PracticasService._instance) {
          PracticasService._instance = new PracticasService();
        }
        return PracticasService._instance;
    }

    toDTO(practica){
      return{
            id: practica.id || practica._id,
            nombre: practica.nombre,
            duracionTurnoEnMins: practica.duracionTurnoEnMins,
            especialidadId: practica.especialidadId,
            nombreEspecialidad: practica.nombreEspecialidad,
            costo: practica.costo
      }
    }

    toCoberturaDTO(cobertura){
         return{
            id: cobertura.id || cobertura._id,
            practicaId: cobertura.practicaId,
            nivelCobertura: cobertura.nivelCobertura
        }
    }


    async createPractica(practicaData){
      const especialidad = await this.especialidadesService.findById(practicaData.especialidadId);

      if (!especialidad) {
          throw new ObjectDoesntExistError();
      }

      const practica = new Practica(
              practicaData.nombre, 
              practicaData.duracionTurnoEnMins, 
              especialidad.id,
              especialidad.nombre,
              practicaData.costo
      );

      const practicaGuardada = await this.practicasRepository.savePractica(practica);
      return this.toDTO(practicaGuardada);
    }

     async findPracticas(){
        const practicas = await this.practicasRepository.findPracticas();
        return practicas.map(p => this.toDTO(p));
    }

    async findById(id){
        const practica = await this.practicasRepository.findById(id);
        if (!practica){
            throw new ObjectDoesntExistError();
        }

        return this.toDTO(practica);
    }

    async deletePractica(id){
      const practicaEliminada = await this.practicasRepository.deletePractica(id);
        if (!practicaEliminada){
            throw new ObjectDoesntExistError();
        } 
      }

    
    
    // Coberturas
    async createCobertura(practicaId, coberturaData){
    const practica = await this.practicasRepository.findById(practicaId);

    if (!practica) {
        throw new ObjectDoesntExistError();
    }
    const cobertura = new CoberturaPractica (
            practicaId, 
            coberturaData.nivelCobertura);

    const coberturaGuardada = await this.practicasRepository.saveCobertura(cobertura);
    return this.toCoberturaDTO(coberturaGuardada);  
    }

    async findCoberturaById(coberturaId){
        const cobertura = await this.practicasRepository.findCoberturaById(coberturaId);
        if (!cobertura){
            throw new ObjectDoesntExistError();
        }

        return this.toCoberturaDTO(cobertura)
    }
}

module.exports = PracticasService;