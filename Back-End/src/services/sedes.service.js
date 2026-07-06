const SedesRepository = require('../domain/clients/repositories/sedes.repository');
const {ObjectDoesntExistError} = require('../errors/app.errors');
const {Sede} = require('../domain/entities');

class SedesService {
    constructor() {
        this.sedesRepository = SedesRepository.instance();
    }

    static instance() {
    if (!SedesService._instance) {
      SedesService._instance = new SedesService();
    }
    return SedesService._instance;
}

    toDTO(sede){
        return{
            id: sede.id || sede._id,
            nombre: sede.nombre,
            direccion: sede.direccion
        }
    }


    async createSede(sedeData){
        const sede = new Sede(
            sedeData.nombre,
            sedeData.direccion);
        
        const sedeGuardada = await this.sedesRepository.saveSede(sede); 
        return this.toDTO(sedeGuardada);
    } 

    async findById(id){
        const sede = await this.sedesRepository.findById(id);
        if (!sede){
            throw new ObjectDoesntExistError();
        }
        return this.toDTO(sede);
    }

    async findSedes(){
        const sedes = await this.sedesRepository.findSedes();
        return sedes.map(s => this.toDTO(s));
    }

    async deleteSede(id){
        const sedeEliminada = await this.sedesRepository.deleteSede(id);

        if (!sedeEliminada){
            throw new ObjectDoesntExistError();
        }
        
    }


}

module.exports = SedesService;