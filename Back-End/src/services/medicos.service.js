const MedicosRepository = require('../domain/clients/repositories/medicos.repository');
const PracticasService = require("../services/practicas.service");
const { MedicoDoesntExistError, DisponibilidadDoesntExistError, PracticaYaAsignadaError, PracticaNoAsignadaError, ColisionDeDisponibilidad} = require('../errors/medicos.errors');
const SedesService = require('../services/sedes.service');
const {Medico, DisponibilidadHoraria} = require('../domain/entities');
const {ObjectDoesntExistError, NotFoundError} = require('../errors/app.errors');
const VerificadorDeDisponibilidad = require('../domain/entities/static/verificadorDeDisponibilidad')


class MedicosService {

  constructor(){
      this.medicosRepository = MedicosRepository.instance();
      this.sedesService = SedesService.instance();
      this.practicasService = PracticasService.instance();
  }

  static instance() {
      if (!MedicosService._instance) {
        MedicosService._instance = new MedicosService();
      }
      return MedicosService._instance;
  }

  toDTO(medico){

       if (!medico) return null; 
        return{
            id: medico.id || medico._id,
            usuarioId: medico.usuarioId,
            nombre: medico.nombre,
            dni: medico.dni,
            matricula: medico.matricula,
            sedes: medico.sedes?.map(s => ({
              sedeId: s.sedeId,
              nombreSede: s.nombreSede
            })),
            practicas: medico.practicas?.map(p => ({
              practicaId: p.practicaId,
              nombrePractica: p.nombrePractica
            })),
            disponibilidades: medico.disponibilidades?.map(d => ({
              id: d.id || d._id,
              diaSemana: d.diaSemana,
              horaDesde: d.horaDesde,
              horaHasta: d.horaHasta
            }))
        }
    }

  async createMedico(medicoData){

      const sedesDocs = await Promise.all(
      medicoData.sedes.map(sedeId => this.sedesService.findById(sedeId))
      );


      if (!sedesDocs || sedesDocs.length === 0 || sedesDocs.includes(null)) {
        throw new NotFoundError();
    }

      const sedesDelMedico = sedesDocs.map(s => ({
        sedeId: s.id,
        nombreSede: s.nombre
    }));   


      const medico = new Medico(
          medicoData.usuarioId,
          medicoData.nombre,
          medicoData.dni,
          medicoData.matricula, 
          sedesDelMedico); 

          const medicoGuardado = await this.medicosRepository.saveMedico(medico);

          return this.toDTO(medicoGuardado);
        
      }

  
  async findMedicos(){
      const medicos = await this.medicosRepository.findMedicos();
      return medicos.map(m => this.toDTO(m))
  }      
       
  async findById(id){
    const medico = await this.medicosRepository.findById(id);
      if (!medico){
          throw new ObjectDoesntExistError();
      }
        return this.toDTO(medico);
  }

  async findByUsuarioId(usuarioId){
        const medico = await this.medicosRepository.findByUsuarioId(usuarioId);
        return this.toDTO(medico);
    }


  // Disponibilidades
  async findDisponibilidadesByMedico(id){      
    const medico = await this.medicosRepository.findById(id);
    if(!medico){
      throw new ObjectDoesntExistError();
    }
    
    const disponibilidades = medico.disponibilidades
    return disponibilidades;
  }

  async createDisponibilidad(id, disponibilidadData){
    const medico = await this.medicosRepository.findById(id);
    
    if(!medico){
      throw new ObjectDoesntExistError();
    }
    
    if(VerificadorDeDisponibilidad.hayConflicto(medico.disponibilidades,disponibilidadData.diaSemana,disponibilidadData.horaDesde,disponibilidadData.horaHasta )){
      throw new ColisionDeDisponibilidad();
    }

    medico.definirDisponibilidad(disponibilidadData.diaSemana,
      disponibilidadData.horaDesde,disponibilidadData.horaHasta);
      
    const medicoGuardado = await this.medicosRepository.updateMedico(medico);
    return this.toDTO(medicoGuardado);
  }
  
  async deleteDisponibilidadByID(medicoId, disponibilidadHorariaID){
    const medico = await this.medicosRepository.findById(medicoId);
    
    if(!medico){
      throw new ObjectDoesntExistError();
    }
    if(!medico.disponibilidades.find(d => d._id.toString() === disponibilidadHorariaID)){
      throw new ObjectDoesntExistError();
    }

    const medicoGuardado = await this.medicosRepository.deleteDisponibilidadByID(medicoId, disponibilidadHorariaID,{new: true})
    return this.toDTO(medicoGuardado);
  }


  // Practicas
  async findPracticasByMedico(id){
    const medico = await this.medicosRepository.findById(id);
    if (!medico){
        throw new ObjectDoesntExistError();
    }
    return medico.practicas;
  }

  async addPractica(medicoId, practicaId){
    const medico = await this.medicosRepository.findById(medicoId);
    if (!medico){
        throw new ObjectDoesntExistError();
    }
    const practica = await this.practicasService.findById(practicaId);
    if (!practica){
        throw new ObjectDoesntExistError();
    }

    if (medico.practicas.some(p => p.practicaId.toString() === practicaId)){
        throw new PracticaYaAsignadaError();
    }

    medico.agregarPractica(practica);
    await this.medicosRepository.updateMedico(medico);

    return this.toDTO(medico);
  }

  async removePracticaById(medicoId, practicaId){
    const medico = await this.medicosRepository.findById(medicoId);
    if (!medico){
        throw new ObjectDoesntExistError();
    }
    
    if (!medico.practicas.some(p => p.practicaId.toString() === practicaId)){
        throw new PracticaNoAsignadaError();
    }

    medico.removerPractica(practicaId);
    await this.medicosRepository.updateMedico(medico);
  }

    async findMedicosByPracticaId(practicaId){
      const medicos = await this.medicosRepository.findMedicosByPracticaId(practicaId);
      return medicos.map(m => this.toDTO(m));
    }


  // Especialidades
  async findEspecialidadesByMedico(id){
    const medico = await this.medicosRepository.findById(id);
    if (!medico){
        throw new ObjectDoesntExistError();
    }
    const especialidades = [];
    medico.practicas.forEach(p => {
    const yaExiste = especialidades.some(e => e.especialidadId.toString() === p.especialidadId.toString());
      if(!yaExiste){
        especialidades.push({
          especialidadId: p.especialidadId,
          nombreEspecialidad: p.nombreEspecialidad
        })
      }
    });

    return especialidades;
  }
}
module.exports = MedicosService;

