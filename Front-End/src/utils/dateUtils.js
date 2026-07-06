
//Funcion creada para devolver horas en correcto formato
export function formatFechaHora(fechaHora) {
  if (!fechaHora) return "";

  const clean = fechaHora.replace("Z", "");

  const [fecha, horaCompleta] = clean.split("T");

  const hora = horaCompleta.substring(0,5);

  const [year, month, day] = fecha.split("-");
  const fechaFormateada = `${day}/${month}/${year}`;

  return `${fechaFormateada} ${hora}`;
}