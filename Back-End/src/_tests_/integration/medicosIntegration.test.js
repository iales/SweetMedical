const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const MedicoModel = require('../../schemas/medicoSchema'); // ajustá el path

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/SweetMedical_test');
});

afterEach(async () => {
  await MedicoModel.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('POST /medicos/:id/disponibilidades', () => {
  let medicoId;

  beforeEach(async () => {
    const medico = await MedicoModel.create({
      usuarioId: '6a304612e3052a37f918b65e',
      nombre: 'Laura Gómez',
      matricula: 'MP12345',
      dni: '28999111',
      sedes: [
        {
          sedeId: new mongoose.Types.ObjectId('6a028a2bb8bc455f9f8ff135'),
          nombreSede: 'Instituto Santa Trinidad'
        }
      ],
      practicas: [
        {
          practicaId: new mongoose.Types.ObjectId('6a028a69b8bc455f9f8ff138'),
          nombrePractica: 'Cirugia de torso',
          especialidadId: new mongoose.Types.ObjectId('69ff8637e72715997fa15273'),
          nombreEspecialidad: 'Cirugias avanzadas'
        }
      ],
      disponibilidades: []
    });

    medicoId = medico._id.toString();
  });

  it('Debería crear una nueva disponibilidad para el médico', async () => {
    const nuevaDisponibilidad = {
      diaSemana: 'Jueves',
      horaDesde: '09:00',
      horaHasta: '18:00'
    };

    const res = await request(app)
      .post(`/medicos/${medicoId}/disponibilidades`)
      .send(nuevaDisponibilidad);

    expect(res.statusCode).toBe(201);
    expect(res.body.disponibilidades).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          diaSemana: 'Jueves',
          horaDesde: '09:00',
          horaHasta: '18:00'
        })
      ])
    );
  }, 10000);

  it('Debería listar la disponibilidad recién creada', async () => {
    await request(app)
      .post(`/medicos/${medicoId}/disponibilidades`)
      .send({ diaSemana: 'Jueves', horaDesde: '09:00', horaHasta: '18:00' });

    const res = await request(app)
      .get(`/medicos/${medicoId}/disponibilidades`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          diaSemana: 'Jueves',
          horaDesde: '09:00',
          horaHasta: '18:00'
        })
      ])
    );
  }, 10000);
});