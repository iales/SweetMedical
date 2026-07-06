const { ObjectDoesntExistError } = require('../../errors/app.errors');
const mockRepoPracticas = {savePractica: jest.fn(), findPracticas: jest.fn(), findById: jest.fn(), deletePractica: jest.fn(), saveCobertura: jest.fn(), findCoberturaById: jest.fn() };
const mockEspecialidadesService = { findById: jest.fn() };

jest.mock('../../domain/clients/repositories/practicas.repository.js', () => ({ instance: () => mockRepoPracticas }));
jest.mock('../../services/especialidades.service.js', () => ({ instance: () => mockEspecialidadesService }));

const PracticasService = require('../../services/practicas.service.js');

describe('PracticasService', () => {
    let service;

    beforeEach(() => {
      jest.clearAllMocks();
      service = new PracticasService();
    });

    describe('createPractica', () => {
        it('Debe crear una práctica correctamente cuando la especialidad existe', async () => {
            const especialidadMock = { id: 'e1', nombre: 'Diagnóstico por imágenes' };
            const practicaGuardadaMock = { id: 'p1', nombre: 'Ecografía', duracionTurnoEnMins: 30, especialidadId: 'e1', nombreEspecialidad: 'Diagnóstico por imágenes', costo: 5000 };

            mockEspecialidadesService.findById.mockResolvedValue(especialidadMock);
            mockRepoPracticas.savePractica.mockResolvedValue(practicaGuardadaMock);

            const practicaData = { nombre: 'Ecografía', duracionTurnoEnMins: 30, especialidadId: 'e1', costo: 5000 };
            const result = await service.createPractica(practicaData);

            expect(mockEspecialidadesService.findById).toHaveBeenCalledWith('e1');
            expect(mockRepoPracticas.savePractica).toHaveBeenCalled();
            expect(result).toEqual({
              id: 'p1',
              nombre: 'Ecografía',
              duracionTurnoEnMins: 30,
              especialidadId: 'e1',
              nombreEspecialidad: 'Diagnóstico por imágenes',
              costo: 5000
            });
        });

        it('Debe lanzar ObjectDoesntExistError si la especialidad no existe', async () => {
            mockEspecialidadesService.findById.mockResolvedValue(null);
            const practicaData = { especialidadId: 'eInvalida' };

            await expect(service.createPractica(practicaData)).rejects.toThrow(ObjectDoesntExistError);
        });
    });

    describe('findPracticas', () => {
        it('Debe retornar un array de prácticas formateadas con toDTO', async () => {
            const listaMock = [
                { _id: 'p1', nombre: 'Ecografía', duracionTurnoEnMins: 30 },
                { id: 'p2', nombre: 'Radiografía', duracionTurnoEnMins: 15 }
            ];
            mockRepoPracticas.findPracticas.mockResolvedValue(listaMock);

            const result = await service.findPracticas();

            expect(mockRepoPracticas.findPracticas).toHaveBeenCalled();
            expect(result).toHaveLength(2);
            expect(result[0].id).toBe('p1'); // Verifica que maneje el fallback del _id de Mongo
            expect(result[1].id).toBe('p2');
        });
    });

    describe('deletePractica', () => {
        it('Debe eliminar la práctica correctamente si el repositorio confirma el borrado', async () => {
            mockRepoPracticas.deletePractica.mockResolvedValue({ id: 'p1' });

            await expect(service.deletePractica('p1')).resolves.not.toThrow();
            expect(mockRepoPracticas.deletePractica).toHaveBeenCalledWith('p1');
        });

        it('Debe lanzar ObjectDoesntExistError si la práctica a eliminar no existe', async () => {
            mockRepoPracticas.deletePractica.mockResolvedValue(null);

            await expect(service.deletePractica('pNoExiste')).rejects.toThrow(ObjectDoesntExistError);
        });
    });

    describe('Coberturas', () => {
      describe('createCobertura', () => {
        it('Debe crear una cobertura para una práctica existente', async () => {
            const practicaMock = { id: 'p1', nombre: 'Ecografía' };
            const coberturaGuardadaMock = { id: 'cob1', practicaId: 'p1', nivelCobertura: 'TOTAL' };

            mockRepoPracticas.findById.mockResolvedValue(practicaMock);
            mockRepoPracticas.saveCobertura.mockResolvedValue(coberturaGuardadaMock);

            const result = await service.createCobertura('p1', { nivelCobertura: 'TOTAL' });

            expect(mockRepoPracticas.findById).toHaveBeenCalledWith('p1');
            expect(mockRepoPracticas.saveCobertura).toHaveBeenCalled();
            expect(result).toEqual({ id: 'cob1', practicaId: 'p1', nivelCobertura: 'TOTAL' });
        });

        it('Debe lanzar ObjectDoesntExistError si se intenta crear una cobertura para una práctica inexistente', async () => {
            mockRepoPracticas.findById.mockResolvedValue(null);

            await expect(service.createCobertura('pNoExiste', { nivelCobertura: 'TOTAL' })).rejects.toThrow(ObjectDoesntExistError);
        });
      });

      describe('findCoberturaById', () => {
        it('Debe retornar la cobertura mapeada si existe', async () => {
            const coberturaMock = { _id: 'cob1', practicaId: 'p1', nivelCobertura: 'PARCIAL' };
            mockRepoPracticas.findCoberturaById.mockResolvedValue(coberturaMock);

            const result = await service.findCoberturaById('cob1');

            expect(mockRepoPracticas.findCoberturaById).toHaveBeenCalledWith('cob1');
            expect(result.id).toBe('cob1');
        });

        it('Debe lanzar ObjectDoesntExistError si la cobertura no existe', async () => {
            mockRepoPracticas.findCoberturaById.mockResolvedValue(null);

            await expect(service.findCoberturaById('cobInvalida')).rejects.toThrow(ObjectDoesntExistError);
        });
      });
    });

});
