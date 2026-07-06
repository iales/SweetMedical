const VerificadorDeDisponibilidad = require('../../../src/domain/entities/static/verificadorDeDisponibilidad.js');
const {DisponibilidadNotAvailableError} = require('../../errors/medicos.errors.js');

const mockRepoTurnos = { saveTurno: jest.fn(), findTurnosActivosByMedicoId: jest.fn(),findById: jest.fn(), updateTurno: jest.fn()};
const mockMedicosService = { findById: jest.fn(), findMedicos: jest.fn() };
const mockPacientes = { findById: jest.fn() };
const mockSedes = { findById: jest.fn() };
const mockPracticas = { findById: jest.fn() };
const mockObras = { findPlanById: jest.fn() };
const mockRepoUsuarios = {findById: jest.fn()};
const mockNotificacionesService = { 
    createNotificacion: jest.fn(),
    notificarTurnoReservadoPaciente: jest.fn(),
    notificarTurnoReservadoMedico: jest.fn(),
    notificarTurnoModificadoPaciente: jest.fn(),
    notificarTurnoPendienteConfirmacionMedico: jest.fn()};

// 2. Hacemos que jest.mock devuelva SIEMPRE ese mismo objeto fijo
jest.mock('../../domain/clients/repositories/turnos.repository.js', () => ({ instance: () => mockRepoTurnos }));
jest.mock('../../services/medicos.service.js', () => ({ instance: () => mockMedicosService }));
jest.mock('../../services/pacientes.service.js', () => ({ instance: () => mockPacientes }));
jest.mock('../../services/sedes.service.js', () => ({ instance: () => mockSedes }));
jest.mock('../../services/practicas.service.js', () => ({ instance: () => mockPracticas }));
jest.mock('../../services/obrasSociales.service.js', () => ({ instance: () => mockObras }));
jest.mock('../../domain/clients/repositories/usuarios.repository.js', () => ({instance: () => mockRepoUsuarios }));
jest.mock('../../services/notificaciones.service.js', () => ({ instance: () => mockNotificacionesService }));

const TurnosService = require('../../services/turnos.service.js');
 
describe('TurnosService', () => {
  let service;
    
    afterAll(() => {
        jest.useRealTimers();
    });
    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2026-05-25T10:00:00Z'));
    });
    beforeEach(() => {
      jest.clearAllMocks();
      service = new TurnosService();
    });
    
  // TEST 1: creación de turno con datos válidos
    it('Creación de turno exitosa', async () => {
    const turnoData = {
        medicoId: 'm1',
        pacienteId: 'p1',
        sedeId: 's1',
        practicaId: 'pr1',
        fechaHora: '2026-06-01T09:00:00'
    };
    mockMedicosService.findById.mockResolvedValue({
      id: 'm1',
      practicas: [{ practicaId: 'pr1' }],
      sedes: [{ sedeId: 's1' }],
      disponibilidades: [{ diaSemana: 'Lunes', horaDesde: '08:00', horaHasta: '19:00' }]
    });
    
    mockPacientes.findById.mockResolvedValue({ id: 'p1', planId: 'plan123' });
    mockSedes.findById.mockResolvedValue({ id: 's1' });
    mockPracticas.findById.mockResolvedValue({ id: 'pr1', nombre: 'Consulta', duracionTurnoEnMins: 30, costo: 2500 });
    mockObras.findPlanById.mockResolvedValue({ id: 'plan123', coberturasPractica: [] });
    mockRepoTurnos.findTurnosActivosByMedicoId.mockResolvedValue([]);
    mockRepoTurnos.saveTurno.mockImplementation(t => ({ ...t, id: 'turno-real' }));

    const result = await service.createTurno(turnoData);
    
    expect(mockRepoTurnos.saveTurno).toHaveBeenCalled();
    expect(result).toMatchObject({
        medicoId: 'm1',
        pacienteId: 'p1',
        estado: 'RESERVADO',
        costo: 2500
    });
    });

    // TEST 2: creacion de turno rechazada por datos invalidos
    it('Debe lanzar error si el medico no tiene disponibilidad en una fecha/horario', async () => {
    const turnoData = {
        medicoId: 'm1',
        pacienteId: 'p1',
        sedeId: 's1',
        practicaId: 'pr1',
        fechaHora: '2026-05-31T09:00:00'
    };

    mockMedicosService.findById.mockResolvedValue({
        id: 'm1',
        practicas: [{ practicaId: 'pr1' }],
        sedes: [{ sedeId: 's1',nombreSede: 's1' }],
        disponibilidades: [
        { diaSemana: 'Lunes', horaDesde: '08:00', horaHasta: '19:00' }
        ]
    });
    mockPacientes.findById.mockResolvedValue({ id: 'p1', planId: 'plan123' });
    mockSedes.findById.mockResolvedValue({ id: 's1' });
    mockPracticas.findById.mockResolvedValue({
        id: 'pr1',
        nombre: 'Consulta',
        duracionTurnoEnMins: 30,
        costo: 2500
    });
    mockObras.findPlanById.mockResolvedValue({
        id: 'plan123',
        coberturasPractica: []
    });
    mockRepoTurnos.findTurnosActivosByMedicoId.mockResolvedValue([]);

    await expect(service.createTurno(turnoData))
    .rejects.toThrow('El médico no está disponible en la fecha y hora seleccionada');
    
    });

    it ('Caso: Debe generar posibles turnos para practica cierta practica con un medico especifico', async () => {
        mockMedicosService.findById.mockResolvedValue({
            nombre: 'Dr. House',
            id: 'm1',
            practicas: [{ practicaId: 'pr1' }],
            sedes: [{ sedeId: 's1', nombreSede: 'Central Medica God Ingenieria' }],
            disponibilidades: [{ diaSemana: 'Lunes', horaDesde: '08:00', horaHasta: '13:00' }]
        });
        
        mockPacientes.findById.mockResolvedValue({ id: 'p1', planId: 'plan123' });
        mockSedes.findById.mockResolvedValue({ id: 's1' });
        mockPracticas.findById.mockResolvedValue({ 
            id: 'pr1',
            nombre: 'Biopsia', 
            duracionTurnoEnMins: 60,
            costo: 2500, 
            nombreEspecialidad: 'Pediatria',
            especialidadId: '123'
        });
        mockObras.findPlanById.mockResolvedValue({ id: 'plan123', coberturasPractica: [] });
        mockRepoTurnos.findTurnosActivosByMedicoId.mockResolvedValue([]);
        
        const query = {pacienteId: 'p1' ,practicaId: 'pr1', fecha: '2026-06-01', medicoId: 'm1'}
        const result = await service.findTurnosByPacienteRequirements(query);
        
        expect(result.length).toBeGreaterThan(0);
         
        expect(result[0]).toMatchObject({
            medicoId: 'm1',
            nombreMedico: 'Dr. House', 
            practicaId: 'pr1',
            nombrePractica: 'Biopsia',
            duracionTurnoEnMins: 60,
            especialidadId: '123',
            nombreEspecialidad: 'Pediatria',
            desde: expect.any(Date),
            sedeId: 's1',
            nombreSede: 'Central Medica God Ingenieria',
            costo: 2500
        });
    });

});

describe('TurnosService - updateTurno', () => {
    let service;
        afterAll(() => {
        jest.useRealTimers();
    });
    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2026-05-25T10:00:00Z'));
    });
    beforeEach(() => {
      jest.clearAllMocks();
      service = new TurnosService();
    });

    const turnoBase = {
        id: 't1',
        medicoId: 'm1',
        pacienteId: 'p1',
        sedeId: 's1',
        practicaId: 'pr1',
        duracionEnMins: 30,
        estado: 'RESERVADO',
        fechaHora: new Date('2026-05-26T10:00:00Z'), 
        actualizarEstado: jest.fn() 
    };


    it('Camino Malo 1: Debe lanzar error si la nueva fecha está en el pasado', async () => {
        const turnoData = {
            fechaHora: '2026-05-20T10:00:00Z', 
            costo: 3500
        };

        mockRepoTurnos.findById.mockResolvedValue({ ...turnoBase });

        // ValidadorDeTurno.validarFechaCoherente debería cortar la ejecución acá
        await expect(service.updateTurno('t1', turnoData))
            .rejects.toThrow(); 
            
        // Validamos que no se intentó guardar nada
        expect(mockRepoTurnos.updateTurno).not.toHaveBeenCalled();
    });

    it('Camino Malo 2: Debe lanzar error si el médico ya tiene un turno en ese nuevo horario', async () => {
        const turnoData = {
            fechaHora: '2026-06-01T15:00:00Z',
            costo: 3500
        };

        mockRepoTurnos.findById.mockResolvedValue({ ...turnoBase });
        
        mockMedicosService.findById.mockResolvedValue({
            id: 'm1',
            disponibilidades: [{ diaSemana: 'Lunes', horaDesde: '08:00', horaHasta: '18:00' }]
        });

        const turnoOcupado = {
            id: 't2',
            fechaHora: new Date('2026-06-01T15:15:00Z'), 
            duracionEnMins: 30
        };
        
        mockRepoTurnos.findTurnosActivosByMedicoId.mockResolvedValue([turnoBase, turnoOcupado]);

        //debería lanzar DisponibilidadNotAvailableError
        await expect(service.updateTurno('t1', turnoData))
            .rejects.toThrow();

        expect(mockRepoTurnos.updateTurno).not.toHaveBeenCalled();
        expect(mockNotificacionesService.createNotificacion).not.toHaveBeenCalled();
    });
});

describe('TurnosService - createTurno', () => {
    let service;
    afterAll(() => {
        jest.useRealTimers();
    });
    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2026-05-25T10:00:00Z'));
    });
    beforeEach(() => {
      jest.clearAllMocks();
      service = new TurnosService();
    });

 
    const baseTurnoInput = {
        medicoId: 'm1',
        pacienteId: 'p1',
        sedeId: 's1',
        practicaId: 'pr1',
        fechaHora: '2026-06-01T09:00:00Z' 
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Camino Feliz: Debe crear el turno con éxito, calcular costo con cobertura parcial y guardar en DB', async () => {
        mockMedicosService.findById.mockResolvedValue({
            id: 'm1',
            practicas: [{ practicaId: 'pr1' }],
            sedes: [{ sedeId: 's1' }],
            disponibilidades: [{ diaSemana: 'Lunes', horaDesde: '08:00', horaHasta: '13:00' }]
        });


        mockPacientes.findById.mockResolvedValue({ id: 'p1', planId: 'plan123' });
        mockSedes.findById.mockResolvedValue({ id: 's1' });
        mockPracticas.findById.mockResolvedValue({ id: 'pr1', nombre: 'Biopsia', duracionTurnoEnMins: 30, costo: 5000 });
        mockObras.findPlanById.mockResolvedValue({
            id: 'plan123',
            coberturasPractica: [{ practicaId: 'pr1', nivelCobertura: 'PARCIAL' }]
        });
        mockRepoTurnos.findTurnosActivosByMedicoId.mockResolvedValue([]);
        mockRepoTurnos.saveTurno.mockImplementation(turno => ({ ...turno, id: 'turno-guardado-123' }));

        const result = await service.createTurno(baseTurnoInput);

        expect(mockRepoTurnos.saveTurno).toHaveBeenCalled();
        expect(result).toMatchObject({
            id: 'turno-guardado-123',
            medicoId: 'm1',
            pacienteId: 'p1',
            estado: 'RESERVADO',
            costo: 2500 
        });
    });

    it('Camino Malo: Debe lanzar InvalidDataError si el médico no realiza la práctica solicitada', async () => {
        mockMedicosService.findById.mockResolvedValue({
            id: 'm1',
            practicas: [{ practicaId: 'OTRA_PRACTICA' }], 
            sedes: [{ sedeId: 's1' }],
            disponibilidades: []
        });
        mockPacientes.findById.mockResolvedValue({ id: 'p1' });
        mockSedes.findById.mockResolvedValue({ id: 's1' });
        mockPracticas.findById.mockResolvedValue({ id: 'pr1' });+

        await expect(service.createTurno(baseTurnoInput)).rejects.toThrow();
        
        expect(mockRepoTurnos.saveTurno).not.toHaveBeenCalled();
    });

    it('Camino Malo: Debe lanzar error si la fecha elegida está en el pasado', async () => {
        const turnoPasado = {
            ...baseTurnoInput,
            fechaHora: '2026-05-20T09:00:00Z' 
        };

        mockMedicosService.findById.mockResolvedValue({ id: 'm1' });
        mockPacientes.findById.mockResolvedValue({ id: 'p1' });
        mockSedes.findById.mockResolvedValue({ id: 's1' });
        mockPracticas.findById.mockResolvedValue({ id: 'pr1' });

       
        await expect(service.createTurno(turnoPasado)).rejects.toThrow();
        expect(mockRepoTurnos.saveTurno).not.toHaveBeenCalled();
    });

    it('Camino Malo: Debe lanzar error si el horario colisiona con otro turno activo del médico', async () => {
        mockMedicosService.findById.mockResolvedValue({
            id: 'm1',
            practicas: [{ practicaId: 'pr1' }],
            sedes: [{ sedeId: 's1' }],
            disponibilidades: [{ diaSemana: 'Lunes', horaDesde: '08:00', horaHasta: '13:00' }]
        });
        mockPacientes.findById.mockResolvedValue({ id: 'p1' });
        mockSedes.findById.mockResolvedValue({ id: 's1' });
        mockPracticas.findById.mockResolvedValue({ id: 'pr1', duracionTurnoEnMins: 30 });

        const turnoExistente = {
            fechaHora: new Date('2026-06-01T09:00:00Z'),
            duracionEnMins: 30
        };
        mockRepoTurnos.findTurnosActivosByMedicoId.mockResolvedValue([turnoExistente]);

        await expect(service.createTurno(baseTurnoInput)).rejects.toThrow();
        expect(mockRepoTurnos.saveTurno).not.toHaveBeenCalled();
    });
});





