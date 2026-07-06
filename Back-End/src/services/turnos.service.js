const TurnosRepository = require('../domain/clients/repositories/turnos.repository');
const PracticasService = require ('./practicas.service.js');
const MedicosService = require('./medicos.service.js');
const PacientesService = require('./pacientes.service.js');
const ObrasSocialesService = require('./../services/obrasSociales.service.js');
const NotificacionesService = require('./../services/notificaciones.service.js');
const SedesService = require('./sedes.service.js');
const {Turno, TrazabilidadEstadoTurno, FiltroPorSede} = require('../domain/entities');
const ValidadorDeTurno = require('../domain/entities/static/validadorDeTurno.js');
const FiltradorDeTurnos = require('../domain/entities/static/filtradorDeTurnos.js');
const CalculadorCosto = require('../domain/entities/static/calculadorCosto.js');
const GeneradorTurnos = require('../domain/entities/static/generadorTurnos.js')
const {TurnoDoesntExistError, DisponibilidadNotAvailableError, ModificacionNotPossibleError, InvalidDataError } = require('../errors/turnos.errors');
const EstadoTurno = require('../domain/entities/estadoTurno.js');


class TurnosService {
    constructor(){
        this.turnosRepository = TurnosRepository.instance();
        this.practicasService = PracticasService.instance();
        this.medicosService = MedicosService.instance();
        this.pacientesService = PacientesService.instance();
        this.sedesService = SedesService.instance(); 
        this.obrasSocialesService = ObrasSocialesService.instance();
        this.notificacionesService = NotificacionesService.instance();
    }


    static instance() {
        if (!TurnosService._instance) {
            TurnosService._instance = new TurnosService();
        }
        return TurnosService._instance;
    }

    toDTO(turno){
        return{
            id: turno.id || turno._id,
            pacienteId: turno.pacienteId,
            medicoId: turno.medicoId,
            sedeId: turno.sedeId,
            fechaHora: turno.fechaHora,
            practicaId: turno.practicaId,
            nombrePractica: turno.nombrePractica,
            duracionEnMins: turno.duracionEnMins,
            estado: turno.estado,
            historialEstados: turno.historialEstados,
            costo: turno.costo
        }
    }



    async findTurnosByPacienteRequirements(criteriosBusqueda){
        
        /* TEMA FILTROS:
        Filtro por rango de fecha: Se muestran los turnos para una fecha particular (enviada por query param)
        Filtro por medico: el usuario puede escoger un medico particular (id enviado por query param)
        Filtro por practica: el usuario esta obligado a enviar la practica que desea
        Filtro por especialidad: NO EXISTE. Esto debido a que cada practica ya tiene asociada una especialidad
        Filtro por sede: existe, tiene logica adicional. Se encuentra al final del método
        */
       

        const practicaId = criteriosBusqueda.practicaId;   
        const pacienteId = criteriosBusqueda.pacienteId; 
        const fechaObjetivo = criteriosBusqueda.fecha;                
        let posiblesTurnos = [];
                
        if (!practicaId || !fechaObjetivo) {      
            throw new InvalidDataError();
        }

        const practica = await this.practicasService.findById(practicaId);
        const paciente = await this.pacientesService.findById(pacienteId);
        const plan = await this.obrasSocialesService.findPlanById(paciente.planId)


        const costo = CalculadorCosto.calcular(practica, plan);
        const medicoId = criteriosBusqueda.medicoId;

        if(medicoId){           // CASO 1: se ha especificado un medico para la busqueda de la practica
            const medico = await this.medicosService.findById(medicoId);
            const turnosActivos = await this.findTurnosActivosByMedicoId(medicoId);

            if(!medico.practicas.find(p => p.practicaId == practicaId)){
                throw new InvalidDataError();
            }
        
            posiblesTurnos = GeneradorTurnos.generarPosiblesTurnos(medico, practica, fechaObjetivo, turnosActivos, costo);    

        } else {    // CASO 2: no se ha especificado un medico para la busqueda de la práctica
            
            const medicos = (await (this.medicosService.findMedicosByPracticaId(practicaId)));


            for (const medico of medicos) {
                const turnosActivos = await this.findTurnosActivosByMedicoId(medico.id);
                const turnos = GeneradorTurnos.generarPosiblesTurnos(medico, practica, fechaObjetivo, turnosActivos, costo); 
                posiblesTurnos = posiblesTurnos.concat(turnos);
            }

        }

        const sedeId = criteriosBusqueda.sedeId;

        if(sedeId){
            posiblesTurnos = FiltroPorSede.filtrarTurnos(posiblesTurnos, sedeId);
        }
        return posiblesTurnos;
    }

    async createTurno(turnoData){
        let medico, paciente, sede, practica;
        
        try{
            medico = await this.medicosService.findById(turnoData.medicoId);
            paciente = await this.pacientesService.findById(turnoData.pacienteId);
            sede = await this.sedesService.findById(turnoData.sedeId);
            practica = await this.practicasService.findById(turnoData.practicaId);
        } catch(error){
            throw new InvalidDataError();
        }

        if(!medico.practicas.find(p => p.practicaId == practica.id) || !medico.sedes.find(s => s.sedeId == sede.id)){
            throw new InvalidDataError();
        }
        
        const fecha = new Date(turnoData.fechaHora);

        ValidadorDeTurno.validarFechaCoherente(fecha);

        const turnosDelMedico = await this.findTurnosActivosByMedicoId(medico.id);
        
        ValidadorDeTurno.validarDisponibilidad(fecha, practica.duracionTurnoEnMins, medico.disponibilidades, turnosDelMedico);
        
       const plan = await this.obrasSocialesService.findPlanById(paciente.planId); 
       const costo = CalculadorCosto.calcular(practica, plan);   
           
        const turno = new Turno(
                medico.id, 
                paciente.id,
                fecha,                              
                sede.id, 
                practica.id,
                practica.nombre,
                practica.duracionTurnoEnMins,
                EstadoTurno.RESERVADO,
                costo
            );

        const trazabilidadEstadoTurno = new TrazabilidadEstadoTurno(new Date(), EstadoTurno.RESERVADO, null);
        turno.actualizarEstado(trazabilidadEstadoTurno);
        const turnoGuardado = await this.turnosRepository.saveTurno(turno); 
        await this.notificacionesService.notificarTurnoReservadoPaciente(paciente, medico, turnoGuardado);

        await this.notificacionesService.notificarTurnoReservadoMedico(medico, paciente, turnoGuardado);

        return this.toDTO(turnoGuardado);
    }

    async findTurnos(){
        const turnos = await this.turnosRepository.findTurnos();
        return turnos.map(t => this.toDTO(t));
    }

    async findMisTurnos(user){
        if (user.rol === 'paciente') {
            return this.findTurnosByPacienteId(user.id);
        }

        if (user.rol === 'medico') {
            const turnos = await this.turnosRepository.findTurnosByMedicoId(user.id);
            return turnos.map(t => this.toDTO(t));
        }

        throw new InvalidDataError();
    }

    async findById(id){
        const turno = await this.turnosRepository.findById(id);
        return this.toDTO(turno);
    }

    async findHorariosDisponiblesParaModificar(id, fechaObjetivo){
        if (!fechaObjetivo) {
            throw new InvalidDataError();
        }

        const turno = await this.turnosRepository.findById(id);
        if (!turno) {
            throw new TurnoDoesntExistError(id);
        }

        const medico = await this.medicosService.findById(turno.medicoId);
        const practica = await this.practicasService.findById(turno.practicaId);
        const turnosActivos = await this.findTurnosActivosByMedicoId(medico.id);
        const otrosTurnos = turnosActivos.filter(t => String(t.id) !== String(turno.id));

        const posiblesTurnos = GeneradorTurnos.generarPosiblesTurnos(
            medico,
            practica,
            fechaObjetivo,
            otrosTurnos,
            turno.costo
        );

        const turnosMismaSede = FiltroPorSede.filtrarTurnos(posiblesTurnos, String(turno.sedeId));
        const ahora = new Date();
        return turnosMismaSede.filter(t => new Date(t.desde) > ahora);
    }
    async updateTurno(id, turnoData){         // A la hora de modificar un turno, no se podrá: cambiar de médico, de práctica, de sede o de paciente
        const turno = await this.turnosRepository.findById(id);
        ValidadorDeTurno.validarEstado(turno);
        const fechaNueva = new Date(turnoData.fechaHora);
        ValidadorDeTurno.validarFechaCoherente(fechaNueva);

        const medico = await this.medicosService.findById(turno.medicoId);
        const turnosDelMedico = (await this.findTurnosActivosByMedicoId(medico.id)).filter(t => t.id !== turno.id);

        ValidadorDeTurno.validarDisponibilidad(fechaNueva, turno.duracionEnMins, medico.disponibilidades, turnosDelMedico);
        ValidadorDeTurno.validarFechaTurno(turno);

        turno.estado = EstadoTurno.ESPERANDO_CONFIRMACION;
        turno.fechaHora = fechaNueva;                           
        const nuevoEstado = new TrazabilidadEstadoTurno(new Date(), EstadoTurno.ESPERANDO_CONFIRMACION, turnoData.motivo);
        turno.actualizarEstado(nuevoEstado);

        const nuevoTurno = await this.turnosRepository.updateTurno(turno);
        const paciente = await this.pacientesService.findById(turno.pacienteId);

        await this.notificacionesService.notificarTurnoModificadoPaciente(paciente, nuevoTurno, fechaNueva);

        await this.notificacionesService.notificarTurnoPendienteConfirmacionMedico(medico, paciente, nuevoTurno);

        return this.toDTO(nuevoTurno);
    }

    async confirmarTurno(id){
        const turno = await this.turnosRepository.findById(id);
        const nuevoEstado = new TrazabilidadEstadoTurno(new Date(), EstadoTurno.RESERVADO, "Confirmado");
        turno.actualizarEstado(nuevoEstado);
        turno.estado = EstadoTurno.RESERVADO;

        const nuevoTurno = await this.turnosRepository.updateTurno(turno);
        const paciente = await this.pacientesService.findById(turno.pacienteId);
        const medico = await this.medicosService.findById(turno.medicoId);

        await this.notificacionesService.notificarTurnoConfirmadoPaciente(paciente, nuevoTurno);

        await this.notificacionesService.notificarTurnoConfirmadoMedico(medico, paciente, nuevoTurno);
        return this.toDTO(nuevoTurno);
    }
    
    async deleteTurno(id, motivo){
        const turno = await this.turnosRepository.findById(id);

        ValidadorDeTurno.validarFechaTurno(turno);
            
        turno.estado = EstadoTurno.CANCELADO;
        const nuevoEstado = new TrazabilidadEstadoTurno(new Date(), turno.estado, motivo); 
        turno.actualizarEstado(nuevoEstado); 

        const turnoCancelado = await this.turnosRepository.updateTurno(turno);

        const paciente = await this.pacientesService.findById(turno.pacienteId);
        const medico = await this.medicosService.findById(turno.medicoId);

        await this.notificacionesService.notificarTurnoCanceladoPaciente(paciente, turnoCancelado, motivo);

        await this.notificacionesService.notificarTurnoCanceladoMedico(medico, paciente, turnoCancelado, motivo);
        
    
    }

    async findTurnosActivosByMedicoId(id){
        const turnos = await this.turnosRepository.findTurnosActivosByMedicoId(id);
        return turnos.map(t => this.toDTO(t));
    }

    async findTurnosByPacienteId(id){
        const turnos = await this.turnosRepository.findTurnosByPacienteId(id);
        return turnos.map(t => this.toDTO(t))
    }

}

module.exports = TurnosService;