const API_BASE_URL = "http://localhost:8000/api";

const fetchAdmin = async (url, options = {}) => {
  const token = localStorage.getItem("jwt_token");

  if (!token) {
    throw new Error("Acceso denegado. Se requiere autenticación.");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}/${url}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `Error en ${url}.`);
  }

  return data;
};

//HOTELES
export const getHotels = () => fetchAdmin("hotels");
export const createHotel = (hotelData) =>
  fetchAdmin("hotels", { method: "POST", body: JSON.stringify(hotelData) });
export const deleteHotel = (id) =>
  fetchAdmin(`hotels/${id}`, { method: "DELETE" });

//HABITACIONES
export const getRoomsByHotel = (hotelId) =>
  fetchAdmin(`habitaciones/hotel/${hotelId}`);
export const createRoom = (roomData) =>
  fetchAdmin("habitaciones", {
    method: "POST",
    body: JSON.stringify(roomData),
  });

//TARIFAS
export const createRate = (rateData) =>
  fetchAdmin("rates", { method: "POST", body: JSON.stringify(rateData) });
