// **AJUSTA ESTA URL** según tu configuración.
const API_BASE_URL = "http://localhost:8000/api";

/**
 * Crea una nueva reserva en el microservicio PHP.
 * @param {object} bookingData - Datos necesarios para la reserva.
 * @param {string} bookingData.hotel_id - ID del hotel a reservar.
 * @param {string} bookingData.check_in - Fecha de inicio (YYYY-MM-DD).
 * @param {string} bookingData.check_out - Fecha de fin (YYYY-MM-DD).
 * @param {number} bookingData.total_price - Precio total de la reserva.
 * @returns {Promise<object>} Retorna la reserva creada con su código de confirmación.
 * @returns {Promise<Array<object>>}
 */
export async function createBooking(bookingData) {
  const token = localStorage.getItem("jwt_token");

  if (!token) {
    throw new Error("Usuario no autenticado. Inicia sesión para reservar.");
  }

  // El microservicio PHP recibirá el ID de usuario desde el token JWT

  try {
    const response = await fetch(`${API_BASE_URL}/reservas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    });

    const data = await response.json();

    if (!response.ok) {
      // Manejar errores de validación, no disponibilidad, o pago fallido
      throw new Error(
        data.message || "Error al crear la reserva. Inténtalo de nuevo."
      );
    }

    // Devolvemos los datos de la reserva creada (incluye código de confirmación)
    return data;
  } catch (error) {
    console.error("API Error (Creación de Reserva):", error);
    throw error;
  }
}

export async function getUserBookings() {
  const token = localStorage.getItem("jwt_token");

  if (!token) {
    throw new Error("Usuario no autenticado.");
  }

  try {
    // En el microservicio PHP  la ruta /reservas probablemente devuelve
    // las reservas asociadas al usuario del token JWT.
    const response = await fetch(`${API_BASE_URL}/reservas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al obtener las reservas.");
    }

    // El sistema PHP devolverá el arreglo de reservas
    return data.bookings || [];
  } catch (error) {
    console.error("API Error (Obtener Reservas):", error);
    throw error;
  }
}

/**
 * @param {string} bookingId - El ID de la reserva a cancelar.
 * @returns {Promise<object>} Retorna el mensaje de éxito.
 */
export async function cancelBooking(bookingId) {
  const token = localStorage.getItem("jwt_token");

  if (!token) {
    throw new Error("Usuario no autenticado.");
  }

  // Asumimos que PHP tiene un endpoint PATCH o DELETE para la cancelación
  // Siguiendo las convenciones REST, usamos DELETE o PATCH:
  try {
    const response = await fetch(`${API_BASE_URL}/reservas/${bookingId}`, {
      method: "DELETE", // o 'PATCH' dependiendo de tu implementación de Laravel
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al cancelar la reserva.");
    }

    return data;
  } catch (error) {
    console.error("API Error (Cancelar Reserva):", error);
    throw error;
  }
}

/**
 * @param {string} bookingId - El ID de la reserva a obtener.
 * @returns {Promise<object>} Retorna el objeto de la reserva.
 */
export async function getBookingDetail(bookingId) {
  const token = localStorage.getItem("jwt_token");

  if (!token) {
    throw new Error("Usuario no autenticado.");
  }

  try {
    // Llama al endpoint de PHP para obtener una reserva por ID
    const response = await fetch(`${API_BASE_URL}/reservas/${bookingId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Error al obtener los detalles de la reserva."
      );
    }

    return data;
  } catch (error) {
    console.error("API Error (Detalle de Reserva):", error);
    throw error;
  }
}
