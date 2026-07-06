const NotificacionesRepository = require('../domain/clients/repositories/notificaciones.repository');
const { ObjectDoesntExistError } = require('../errors/app.errors');
const Notificacion = require('../domain/entities/notificacion');
const UsuariosService = require('../services/usuarios.service');
const PacientesService = require('../services/pacientes.service');
const MedicosService = require('../services/medicos.service');

class NotificacionesService {

    constructor() {
        this.notificacionesRepository = NotificacionesRepository.instance();
        this.usuariosService = UsuariosService.instance();
        this.pacientesService = PacientesService.instance();
        this.medicosService = MedicosService.instance();
    }

    static instance() {
        if (!NotificacionesService._instance) {
            NotificacionesService._instance = new NotificacionesService();
        }
        return NotificacionesService._instance;
    }

    toDTO(notificacion){
        return {
            id: notificacion.id || notificacion._id,
            usuarioId: notificacion.usuarioId,
            mensaje: notificacion.mensaje,   
            leida: notificacion.leida,
            fecha: notificacion.fecha
        }
    }

    async createNotificacion(usuarioId, mensaje) {
        const usuario = await this.usuariosService.findById(usuarioId);

        if (!usuario){
            throw new ObjectDoesntExistError();
        }

        
        const notificacion = new Notificacion(usuarioId, mensaje);


        const notificacionGuardada = await this.notificacionesRepository.save(notificacion);
        return this.toDTO(notificacionGuardada);
    }

        formatearFechaHora(fecha) {
        return new Date(fecha).toLocaleString('es-AR');
    }

    async notificarTurnoReservadoPaciente(paciente, medico, turno) {
        const fechaTurno = this.formatearFechaHora(turno.fechaHora);

        const mensaje = `Tu turno fue reservado correctamente.
            Práctica: ${turno.nombrePractica}
            Médico: ${medico.nombre}
            Fecha y hora: ${fechaTurno}
            Costo: $${turno.costo}`;

        await this.createNotificacion(paciente.usuarioId, mensaje);
    }

    async notificarTurnoReservadoMedico(medico, paciente, turno) {
        const fechaTurno = this.formatearFechaHora(turno.fechaHora);

        const mensaje = `Tenés un nuevo turno reservado.
            Paciente: ${paciente.nombre}
            Práctica: ${turno.nombrePractica}
            Fecha y hora: ${fechaTurno}`;

        await this.createNotificacion(medico.usuarioId, mensaje);
    }

    async notificarTurnoCanceladoPaciente(paciente, turno, motivo) {
        const fechaTurno = this.formatearFechaHora(turno.fechaHora);

        const mensaje = `Tu turno fue cancelado.
            Práctica: ${turno.nombrePractica}
            Fecha y hora: ${fechaTurno}
            Motivo: ${motivo}`;

        await this.createNotificacion(paciente.usuarioId, mensaje);
    }

    async notificarTurnoCanceladoMedico(medico, paciente, turno, motivo) {
        const fechaTurno = this.formatearFechaHora(turno.fechaHora);

        const mensaje = `Se canceló un turno.
            Paciente: ${paciente.nombre}
            Práctica: ${turno.nombrePractica}
            Fecha y hora: ${fechaTurno}
            Motivo: ${motivo}`;

        await this.createNotificacion(medico.usuarioId, mensaje);
    }

    async notificarTurnoModificadoPaciente(paciente, turno, fechaNueva) {
        const fechaTurno = this.formatearFechaHora(fechaNueva);

        const mensaje = `Tu turno fue modificado por el médico.
            Práctica: ${turno.nombrePractica}
            Nuevo horario: ${fechaTurno}`;

        await this.createNotificacion(paciente.usuarioId, mensaje);
    }

    async notificarTurnoPendienteConfirmacionMedico(medico, paciente, turno) {
        const fechaTurno = this.formatearFechaHora(turno.fechaHora);

        const mensaje = `El turno quedó pendiente de confirmación del paciente.
            Paciente: ${paciente.nombre}
            Práctica: ${turno.nombrePractica}
            Nuevo horario: ${fechaTurno}`;

        await this.createNotificacion(medico.usuarioId, mensaje);
    }

    async notificarTurnoConfirmadoPaciente(paciente, turno) {
        const fechaTurno = this.formatearFechaHora(turno.fechaHora);

        const mensaje = `Tu turno fue confirmado.
            Práctica: ${turno.nombrePractica}
            Fecha y hora: ${fechaTurno}`;

        await this.createNotificacion(paciente.usuarioId, mensaje);
    }

    async notificarTurnoConfirmadoMedico(medico, paciente, turno) {
        const fechaTurno = this.formatearFechaHora(turno.fechaHora);

        const mensaje = `El paciente confirmó el turno.
            Paciente: ${paciente.nombre}
            Práctica: ${turno.nombrePractica}
            Fecha y hora: ${fechaTurno}`;

        await this.createNotificacion(medico.usuarioId, mensaje);
    }

    async notificarRecordatorioTurnoPaciente(paciente, medico, turno) {
        const fechaTurno = this.formatearFechaHora(turno.fechaHora);

        const mensaje = `Recordatorio: mañana tenés un turno.
            Práctica: ${turno.nombrePractica}
            Médico: ${medico.nombre}
            Fecha y hora: ${fechaTurno}`;

        await this.createNotificacion(paciente.usuarioId, mensaje);
    }

    async notificarRecordatorioTurnoMedico(medico, paciente, turno) {
        const fechaTurno = this.formatearFechaHora(turno.fechaHora);

        const mensaje = `Recordatorio: mañana tenés un turno agendado.
            Paciente: ${paciente.nombre}
            Práctica: ${turno.nombrePractica}
            Fecha y hora: ${fechaTurno}`;

        await this.createNotificacion(medico.usuarioId, mensaje);
    }

    async findNotificaciones(usuarioId, leida) {
        const usuario = await this.usuariosService.findById(usuarioId);

        if (!usuario){
            throw new ObjectDoesntExistError();
        }

        const notificaciones = leida === undefined
            ? await this.notificacionesRepository.findByUsuarioId(usuarioId)
            : await this.notificacionesRepository.findByUsuarioIdAndLeida(usuarioId, leida);

        return notificaciones.map(n => this.toDTO(n));
    }

    async findUsuarioIdDesdeToken(user) {
        if (!user) {
            throw new ObjectDoesntExistError();
        }

        if (user.usuarioId) {
            return user.usuarioId;
        }

        if (user.rol === 'paciente') {
            const paciente = await this.pacientesService.findById(user.id);
            if (!paciente) throw new ObjectDoesntExistError();
            return paciente.usuarioId;
        }

        if (user.rol === 'medico') {
            const medico = await this.medicosService.findById(user.id);
            if (!medico) throw new ObjectDoesntExistError();
            return medico.usuarioId;
        }

        throw new ObjectDoesntExistError();
    }

    async findMisNotificaciones(user, leida) {
        const usuarioId = await this.findUsuarioIdDesdeToken(user);
        return this.findNotificaciones(usuarioId, leida);
    }

    async marcarComoLeida(notificacionId, user) {
        const usuarioId = await this.findUsuarioIdDesdeToken(user);
        const notificacion = await this.notificacionesRepository.findById(notificacionId);
        if (!notificacion) throw new ObjectDoesntExistError();

        if (String(notificacion.usuarioId) !== String(usuarioId)) {
            throw new ObjectDoesntExistError();
        }

        notificacion.marcarComoLeida()
        const notificacionGuardada = await this.notificacionesRepository.updateNotificacion(notificacion);
        return this.toDTO(notificacionGuardada);
    }

}

module.exports = NotificacionesService;