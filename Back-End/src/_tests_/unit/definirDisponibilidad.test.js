const Medico = require("../../domain/entities/medico")
const DisponibilidadHoraria = require("../../domain/entities/disponibilidadHoraria")

describe('Medico.definirDisponibilidad', () => {
  it('Crea y guarda una disponibilidad correctamente', () => {
    const medico = new Medico();
    medico.disponibilidades = [];
    medico.nextDisponibilidadID = 1;

    const disponibilidad = medico.definirDisponibilidad('Lunes', '09:00', '17:00');

    expect(disponibilidad).toBeInstanceOf(DisponibilidadHoraria);
    expect(disponibilidad.id).toBe(1);
    expect(medico.disponibilidades).toContain(disponibilidad);
    expect(medico.nextDisponibilidadID).toBe(2);

    expect(disponibilidad.diaSemana).toBe('Lunes');
    expect(disponibilidad.horaDesde).toBe('09:00');
    expect(disponibilidad.horaHasta).toBe('17:00');
  });
});