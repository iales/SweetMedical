export const mockObrasSociales = [
  {
    id: "os-001",
    nombre: "OSDE",
    planes: [
      {
        id: "plan-210",
        nombre: "PMO-210 Vital",
        practicas: [
          { nombre: "Consulta Médica General", cobertura: "TOTAL" },
          { nombre: "Análisis de Sangre y Laboratorio", cobertura: "PARCIAL" },
          { nombre: "Radiografías y Ecografías", cobertura: "PARCIAL" },
          { nombre: "Odontología Estética", cobertura: "NO_CUBIERTO" }
        ]
      },
      {
        id: "plan-310",
        nombre: "PMO-310 Platinum",
        practicas: [
          { nombre: "Consulta Médica General", cobertura: "TOTAL" },
          { nombre: "Análisis de Sangre y Laboratorio", cobertura: "TOTAL" },
          { nombre: "Radiografías y Ecografías", cobertura: "TOTAL" },
          { nombre: "Odontología Estética", cobertura: "PARCIAL" }
        ]
      }
    ]
  }
];