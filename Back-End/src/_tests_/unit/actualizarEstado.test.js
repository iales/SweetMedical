const Turno = require("../../domain/entities/turno")

describe('Turno.actualizarEstado', () => {
  it('debería agregar un nuevo estado al historial', () => {
   
    const turno = new Turno(1,1, new Date('2026-05-04T10:00:00Z'), 1, 1, 'Ecocardiograma', 30,'RESERVADO',5000);

    const trazabilidadEstadoTurno = {
      fechaHoraIngreso: new Date('2026-05-04T12:00:000Z'),
      estado: 'RESERVADO',
      motivo: 'Paciente confirmado'
    };

    turno.actualizarEstado(trazabilidadEstadoTurno);

    expect(turno.historialEstados).toHaveLength(1);
    expect(turno.historialEstados[0]).toEqual(trazabilidadEstadoTurno);

    // Aclaración: ya que no estabamos llamando a createTurno por el endpoint, y hay falta de lógica, acá no se está agregando la trazabilidadTurno por defecto

  });
});