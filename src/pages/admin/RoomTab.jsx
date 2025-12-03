import React, { useState, useEffect } from "react";
import {
  getHotels,
  getRoomsByHotel,
  createRoom,
} from "../../api/inventoryAdmin";

const initialRoomState = {
  hotelId: "",
  numeroHabitacion: "",
  tipoHabitacion: "doble", // Default según tipos válidos [cite: 5]
  precio: 100.0,
  estadoHabitacion: "disponible", // Default según estados válidos [cite: 5]
  imagenes: "", // URLs separadas por coma
};

const tiposHabitacion = ["sencilla", "doble", "suite"];
const estadosHabitacion = ["disponible", "mantenimiento", "fueradeservicio"];

const RoomTab = () => {
  const [hotels, setHotels] = useState([]); // Lista de hoteles para el selector
  const [selectedHotelId, setSelectedHotelId] = useState("");
  const [rooms, setRooms] = useState([]); // Habitaciones del hotel seleccionado

  const [newRoom, setNewRoom] = useState(initialRoomState);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- 1. Cargar Hoteles (Necesario para el selector) ---
  useEffect(() => {
    const fetchHotelsList = async () => {
      try {
        // Usamos la función getHotels definida en inventoryAdmin.js
        const data = await getHotels();
        setHotels(data);
        if (data.length > 0) {
          // Seleccionar el primer hotel por defecto
          setSelectedHotelId(data[0].id.toString());
          setNewRoom((prev) => ({ ...prev, hotelId: data[0].id.toString() }));
        }
      } catch (err) {
        setError(err.message || "Error al cargar la lista de hoteles.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchHotelsList();
  }, []);

  // --- 2. Cargar Habitaciones del Hotel Seleccionado (READ) ---
  useEffect(() => {
    if (selectedHotelId) {
      const fetchRooms = async () => {
        setIsLoading(true);
        setError(null);
        try {
          [cite_start]; // Llama a GET: api/Habitaciones/hotel/{hotelId} [cite: 3]
          const data = await getRoomsByHotel(parseInt(selectedHotelId));
          setRooms(data);
        } catch (err) {
          setError(
            err.message ||
              `Error al cargar habitaciones del hotel ${selectedHotelId}.`
          );
          setRooms([]);
        } finally {
          setIsLoading(false);
        }
      };
      fetchRooms();
    }
  }, [selectedHotelId]);

  // --- Manejar el Formulario ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRoom((prev) => ({ ...prev, [name]: value }));
  };

  // --- Crear Habitación (CREATE) ---
  const handleCreate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const roomDataToSend = {
        ...newRoom,
        hotelId: parseInt(newRoom.hotelId),
        numeroHabitacion: parseInt(newRoom.numeroHabitacion),
        precio: parseFloat(newRoom.precio),
        imagenes: newRoom.imagenes
          .split(",")
          .map((url) => url.trim())
          .filter((url) => url !== ""),
      };

      [cite_start]; // Llama a POST: api/Habitaciones [cite: 3]
      const createdRoom = await createRoom(roomDataToSend);

      // Actualizar la lista localmente si pertenece al hotel seleccionado
      if (createdRoom.hotelId.toString() === selectedHotelId) {
        setRooms((prev) => [...prev, createdRoom]);
      }
      setNewRoom(initialRoomState);
      alert(`Habitación ${createdRoom.numeroHabitacion} creada con éxito.`);
    } catch (err) {
      setError(
        err.message || "Error al crear la habitación. Verifica los datos."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading && hotels.length === 0) {
    return (
      <div className="text-center py-10">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const selectedHotelName =
    hotels.find((h) => h.id.toString() === selectedHotelId)?.nombre ||
    "Seleccione un Hotel";

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
        Gestión de Habitaciones
      </h2>

      {error && (
        <div role="alert" className="alert alert-error mb-4">
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Selector de Hotel */}
      <div className="mb-6">
        <label className="label">
          <span className="label-text font-bold">Seleccionar Hotel</span>
        </label>
        <select
          className="select select-bordered w-full max-w-xs"
          value={selectedHotelId}
          onChange={(e) => setSelectedHotelId(e.target.value)}
        >
          {hotels.map((hotel) => (
            <option key={hotel.id} value={hotel.id}>
              {hotel.nombre} (ID: {hotel.id})
            </option>
          ))}
        </select>
      </div>

      {/* Formulario de Creación de Habitación */}
      <form
        onSubmit={handleCreate}
        className="mb-8 p-6 bg-gray-50 rounded-lg shadow-inner"
      >
        <h3 className="text-xl font-bold mb-4">
          Añadir Nueva Habitación a: {selectedHotelName}
        </h3>

        {/* Campos del formulario */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="number"
            name="numeroHabitacion"
            placeholder="Número"
            className="input input-bordered w-full"
            value={newRoom.numeroHabitacion}
            onChange={handleChange}
            required
          />

          <select
            name="tipoHabitacion"
            className="select select-bordered w-full"
            value={newRoom.tipoHabitacion}
            onChange={handleChange}
          >
            {tiposHabitacion.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="precio"
            placeholder="Precio ($)"
            className="input input-bordered w-full"
            value={newRoom.precio}
            onChange={handleChange}
            required
            step="0.01"
            min="0"
          />

          <select
            name="estadoHabitacion"
            className="select select-bordered w-full"
            value={newRoom.estadoHabitacion}
            onChange={handleChange}
          >
            {estadosHabitacion.map((estado) => (
              <option key={estado} value={estado}>
                {estado.charAt(0).toUpperCase() + estado.slice(1)}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="imagenes"
            placeholder="URLs de Imágenes (separadas por coma)"
            className="input input-bordered md:col-span-4 w-full"
            value={newRoom.imagenes}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className={`btn btn-accent mt-4 ${isSubmitting ? "loading" : ""}`}
          disabled={isSubmitting || !selectedHotelId}
        >
          {isSubmitting ? "Creando..." : "Crear Habitación"}
        </button>
      </form>

      {/* Listado de Habitaciones */}
      <h3 className="text-xl font-bold mb-4">
        Habitaciones en {selectedHotelName} ({rooms.length})
      </h3>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="text-gray-600">
              <th>ID</th>
              <th>Número</th>
              <th>Tipo</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td className="font-semibold">{room.numeroHabitacion}</td>
                <td>{room.tipoHabitacion}</td>
                <td>${room.precio}</td>
                <td>
                  <span
                    className={`badge ${
                      room.estadoHabitacion === "disponible"
                        ? "badge-success"
                        : "badge-error"
                    } text-white capitalize`}
                  >
                    {room.estadoHabitacion}
                  </span>
                </td>
                <td className="space-x-2">
                  {/* TODO: Implementar lógica de Edición/Eliminación */}
                  <button className="btn btn-sm btn-error">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rooms.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No hay habitaciones registradas en este hotel.
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomTab;
