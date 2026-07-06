const { ObjectDoesntExistError, NotFoundError } = require('../../errors/app.errors.js');
const {PracticaYaAsignadaError} = require('../../errors/medicos.errors.js');
const mockRepoMedicos = { saveMedico: jest.fn(), findMedicos: jest.fn(), findById: jest.fn(), updateMedico: jest.fn(), deleteDisponibilidadByID: jest.fn() };
const mockUsuariosService = { findById: jest.fn() };
const mockSedesService = { findById: jest.fn() };
const mockPracticasService = { findById: jest.fn() };

jest.mock('../../domain/clients/repositories/medicos.repository.js', () => ({ instance: () => mockRepoMedicos }));
jest.mock('../../services/usuarios.service.js', () => ({ instance: () => mockUsuariosService }));
jest.mock('../../services/sedes.service.js', () => ({ instance: () => mockSedesService }));
jest.mock('../../services/practicas.service.js', () => ({ instance: () => mockPracticasService }));

const MedicosService = require('../../services/medicos.service.js');

describe('MedicosService', () => {
  let service;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new MedicosService();
  });
  

  describe('addPractica', () => {
    it('Debe agregar una práctica correctamente', async () => {
      const medicoMock = { id: 'm1', practicas: [], 
            agregarPractica: jest.fn(function(practica) {
            this.practicas.push(practica);
        })};
      const practicaMock = { practicaId: 'p1', nombrePractica: 'Ecografía'};

      mockRepoMedicos.findById.mockResolvedValue(medicoMock);
      mockPracticasService.findById.mockResolvedValue(practicaMock);
      mockRepoMedicos.updateMedico.mockResolvedValue(medicoMock);

      const result = await service.addPractica('m1', 'p1');

      expect(mockRepoMedicos.findById).toHaveBeenCalledWith('m1');
      expect(mockPracticasService.findById).toHaveBeenCalledWith('p1');
      expect(medicoMock.agregarPractica).toHaveBeenCalledWith(practicaMock);
      expect(mockRepoMedicos.updateMedico).toHaveBeenCalledWith(medicoMock);
      expect(result.practicas).toEqual([{ practicaId: 'p1', nombrePractica: 'Ecografía' }]);
    });


    it('Debe lanzar PracticaYaAsignadaError si la práctica ya está asignada', async () => {
      const medicoMock = { id: 'm1', practicas: [{ practicaId:'p1'}]};

      mockRepoMedicos.findById.mockResolvedValue(medicoMock);
      mockPracticasService.findById.mockResolvedValue({ practicaId:'p1'});

      await expect(service.addPractica('m1', 'p1')).rejects.toThrow(PracticaYaAsignadaError);
    });
  });

  describe('getEspecialidades', () => {

  it('debería devolver especialidades únicas de las prácticas del médico', async () => {
    const medicoMock = {
      id: 'm1',
      practicas: [
        { practicaId: 'p1', especialidadId: 'e1', nombreEspecialidad: 'Cardiología'},
        { practicaId: 'p2', especialidadId: 'e1', nombreEspecialidad: 'Cardiología'},
        { practicaId: 'p3', especialidadId: 'e2', nombreEspecialidad: 'Neurología'}
      ]
    };

    mockRepoMedicos.findById.mockResolvedValue(medicoMock);

    const result = await service.findEspecialidadesByMedico('m1');

    expect(mockRepoMedicos.findById).toHaveBeenCalledWith('m1');
    expect(result).toEqual([
      { especialidadId: 'e1', nombreEspecialidad: 'Cardiología' },
      { especialidadId: 'e2', nombreEspecialidad: 'Neurología' }
    ]);
  });
})
});
  
