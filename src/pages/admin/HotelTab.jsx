// src/pages/admin/HotelTab.jsx
import React, { useState, useEffect } from "react";
import { getHotels, createHotel, deleteHotel } from "../../api/inventoryAdmin";

// Formulario inicial para crear un hotel nuevo
const initialHotelState = {
  nombre: "",
  ciudad: "",
  direccion: "",
  estadoHotel: "disponible",
  imagenes: [], // Se manejarán como una cadena de URLs separadas por coma
};

const HotelTab = () => {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newHotel, setNewHotel] = useState(initialHotelState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Cargar Hoteles (READ) ---
  const fetchHotels = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getHotels();
      // El backend de .NET devuelve una lista de objetos Hotel
      setHotels(data);
    } catch (err) {
      setError(err.message || "Error al cargar la lista de hoteles.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  // --- Manejar el Formulario ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewHotel((prev) => ({ ...prev, [name]: value }));
  };

  // --- Crear Hotel (CREATE) ---
  const handleCreate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Convertir la cadena de URLs a un arreglo de strings
      const hotelDataToSend = {
        ...newHotel,
        imagenes: newHotel.imagenes
          .split(",")
          .map((url) => url.trim())
          .filter((url) => url !== ""),
      };

      const createdHotel = await createHotel(hotelDataToSend);

      // Actualizar la lista localmente
      setHotels((prev) => [...prev, createdHotel]);
      setNewHotel(initialHotelState); // Limpiar formulario
      alert(`Hotel ${createdHotel.nombre} creado con éxito.`);
    } catch (err) {
      setError(err.message || "Error al crear el hotel. Verifica los datos.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Eliminar Hotel (DELETE) ---
  const handleDelete = async (hotelId, hotelName) => {
    if (
      !window.confirm(
        `¿Estás seguro de eliminar el hotel: ${hotelName}? Esto también afectará a sus habitaciones.`
      )
    ) {
      return;
    }

    try {
      await deleteHotel(hotelId);
      // Actualizar la lista localmente
      setHotels((prev) => prev.filter((h) => h.id !== hotelId));
      alert(`Hotel ${hotelName} eliminado con éxito.`);
    } catch (err) {
      setError(
        err.message ||
          "Error al eliminar el hotel. Asegúrate de que no tenga habitaciones asociadas."
      );
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
        Administración de Hoteles
      </h2>

      {error && (
        <div role="alert" className="alert alert-error mb-4">
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Formulario de Creación de Hotel */}
      <form
        onSubmit={handleCreate}
        className="mb-8 p-6 bg-gray-50 rounded-lg shadow-inner"
      >
        <h3 className="text-xl font-bold mb-4">Añadir Nuevo Hotel</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del Hotel"
            className="input input-bordered w-full"
            value={newHotel.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="ciudad"
            placeholder="Ciudad"
            className="input input-bordered w-full"
            value={newHotel.ciudad}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            className="input input-bordered w-full"
            value={newHotel.direccion}
            onChange={handleChange}
            required
          />
          <select
            name="estadoHotel"
            className="select select-bordered w-full"
            value={newHotel.estadoHotel}
            onChange={handleChange}
          >
            <option value="disponible">Disponible</option>
            <option value="fueradeservicio">Fuera de Servicio</option>
          </select>
          <input
            type="text"
            name="imagenes"
            placeholder="URLs de Imágenes (separadas por coma)"
            className="input input-bordered md:col-span-2 w-full"
            value={newHotel.imagenes}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className={`btn btn-primary mt-4 ${isSubmitting ? "loading" : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creando..." : "Crear Hotel"}
        </button>
      </form>

      {/* Listado de Hoteles */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="text-gray-600">
              <th>ID</th>
              <th>Nombre</th>
              <th>Ubicación</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => (
              <tr key={hotel.id}>
                <td>{hotel.id}</td>
                <td className="font-semibold">{hotel.nombre}</td>
                <td>{hotel.ciudad}</td>
                <td>
                  <span
                    className={`badge ${
                      hotel.estadoHotel === "disponible"
                        ? "badge-success"
                        : "badge-warning"
                    } text-white capitalize`}
                  >
                    {hotel.estadoHotel}
                  </span>
                </td>
                <td className="space-x-2">
                  {/* ⚠️ NOTA: El EDITAR (UPDATE) requiere más estados y un modal, se deja pendiente la lógica */}
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() =>
                      alert(`Implementar edición de ${hotel.nombre}`)
                    }
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(hotel.id, hotel.nombre)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {hotels.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No hay hoteles registrados.
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelTab;
