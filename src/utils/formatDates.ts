export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);

  // Obtener día, mes y año
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" }); // Ejemplo: "October"
  const year = date.getFullYear();

  // Obtener hora y minutos
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Asegura dos dígitos

  // Formato AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convierte 0 en 12 para formato 12 horas

  return `${day} ${month}, ${year} - ${formattedHours}:${minutes}${ampm}`;
};
