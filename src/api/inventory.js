// src/api/inventory.js

// Usaremos la URL base de tu API Gateway para acceder al microservicio .NET
// **AJUSTA ESTA URL** según tu configuración de Docker Compose y Kong.
const API_BASE_URL = "http://localhost:8000/api";

/**
 * Consulta la disponibilidad de hoteles y tarifas en el microservicio .NET.
 * @param {string} checkInDate - Fecha de Check-in (formato YYYY-MM-DD).
 * @param {string} checkOutDate - Fecha de Check-out (formato YYYY-MM-DD).
 * @param {string} [destination] - Destino opcional para filtrar.
 * @returns {Promise<Array<object>>} Retorna la lista de habitaciones/hoteles disponibles.
 */
export async function getAvailability(
  checkInDate,
  checkOutDate,
  destination = ""
) {
  // 1. Usar el token JWT para la autenticación (Precondición: Usuario autenticado [cite: 195])
  const token = localStorage.getItem("jwt_token");

  //   if (!token) {
  //     throw new Error("Usuario no autenticado. Necesitas iniciar sesión.");
  //   }

  // 2. Construir la URL con parámetros de consulta
  const params = new URLSearchParams({
    checkin: checkInDate,
    checkout: checkOutDate,
    destination: destination,
  }).toString();

  try {
    const response = await fetch(`${API_BASE_URL}/disponibilidad?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Enviar el token en el encabezado Authorization
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      // Manejar excepciones como 'Fechas inválidas' o 'error en conexión' [cite: 208]
      throw new Error(
        data.message ||
          "Error al consultar disponibilidad. El servicio .NET falló."
      );
    }

    // El sistema .NET devuelve las habitaciones disponibles y tarifas [cite: 206]
    return data.available_rooms || [];
  } catch (error) {
    console.error("API Error (Disponibilidad):", error);
    throw error;
  }
}
