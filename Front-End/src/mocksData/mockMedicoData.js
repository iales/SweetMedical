export const mockMedicoData = 
  {
    id: "med-883",
    nombre: "Alberto",
    apellido: "Cormillot", 
    matricula: "MN-12345",
    email: 'AlbertoLaCabra@gmail.com' ,
    tipo: 'MEDICO',
    
    sedes: [
    {
      id: 1,
      nombre: "Sede Central Almagro",
      direccion: "Medrano 951, Almagro, CABA"
    },
    {
      id: 2,
      nombre: "Sede Anexo Campus",
      direccion: "Mozart 2300, Villa Lugano, CABA"
    },
    {
      id: 3,
      nombre: "Consultorios Zona Norte",
      direccion: "Av. Maipú 1250, Vicente López, Provincia de Buenos Aires"
    },
    {
      id: 4,
      nombre: "Clínica San Justo",
      direccion: "Monseñor Marcón 2420, San Justo, Provincia de Buenos Aires"
    },
    {
      id: 5,
      nombre: "Centro Médico Lomas",
      direccion: "Las Heras 340, Lomas de Zamora, Provincia de Buenos Aires"
    }
  ], 
    
    practicasHabilitadas: [
      { practicaId: "prac-203", especialidadId: "esp-02" }, 
      { practicaId: "prac-201", especialidadId: "esp-02" }  
    ],
    
    
    disponibilidades: [
    {
      diaSemana: "Lunes",
      horaDesde: "13:00",
      horaHasta: "19:00"
    },
    {
      diaSemana: "Martes",
      horaDesde: "09:00",
      horaHasta: "13:00"
    },
    {
      diaSemana: "Miércoles",
      horaDesde: "08:00",
      horaHasta: "14:00"
    },
    {
      diaSemana: "Jueves",
      horaDesde: "14:00",
      horaHasta: "20:00"
    },
    {
      diaSemana: "Viernes",
      horaDesde: "10:00",
      horaHasta: "16:00"
    }
  ]
  }
