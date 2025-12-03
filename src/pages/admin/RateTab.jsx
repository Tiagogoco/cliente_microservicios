import React, { useState, useEffect } from "react";
import { getHotels, createRate } from "../../api/inventoryAdmin";

const initialRateState = {
  hotelId: "",
  tipoHabitacion: "doble",
  precio: 150.0,
  fechaInicio: "",
  fechaFin: "",
};

const tiposHabitacion = ["sencilla", "doble", "suite"];

const RateTab = () => {
  const [hotels, setHotels] = useState([]);
  const [newRate, setNewRate] = useState(initialRateState);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Cargar Hoteles (Necesario para el selector) ---
  useEffect(() => {
    const fetchHotelsList = async () => {
      try {
        const data = await getHotels();
        setHotels(data);
        if (data.length > 0) {
          setNewRate((prev) => ({ ...prev, hotelId: data[0].id.toString() }));
        }
      } catch (err) {
        setError(err.message || "Error al cargar la lista de hoteles.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchHotelsList();
  }, []);

  // --- Manejar el Formulario ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRate((prev) => ({ ...prev, [name]: value }));
  };

  // --- Crear Tarifa (CREATE) ---
  const handleCreate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const rateDataToSend = {
        ...newRate,
        hotelId: parseInt(newRate.hotelId),
        precio: parseFloat(newRate.precio),
        // Aquí podrías agregar más validaciones de fechas
      };

      // Llama a POST /rates (microservicio .NET)
      await createRate(rateDataToSend);

      setNewRate(initialRateState);
      alert(`Tarifa de $${newRate.precio} creada con éxito.`);
    } catch (err) {
      setError(err.message || "Error al crear la tarifa. Verifica los datos.");
    } finally {
      setIsSubmitting(false);
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
        Gestión de Tarifas y Precios
      </h2>

      {error && (
        <div role="alert" className="alert alert-error mb-4">
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Formulario de Creación de Tarifa */}
      <form
        onSubmit={handleCreate}
        className="mb-8 p-6 bg-gray-50 rounded-lg shadow-inner"
      >
        <h3 className="text-xl font-bold mb-4">Aplicar Nueva Tarifa</h3>

        {/* Campos del formulario */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Selector de Hotel */}
          <select
            name="hotelId"
            className="select select-bordered w-full"
            value={newRate.hotelId}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Seleccione Hotel
            </option>
            {hotels.map((hotel) => (
              <option key={hotel.id} value={hotel.id}>
                {hotel.nombre}
              </option>
            ))}
          </select>

          {/* Tipo de Habitación */}
          <select
            name="tipoHabitacion"
            className="select select-bordered w-full"
            value={newRate.tipoHabitacion}
            onChange={handleChange}
            required
          >
            {tiposHabitacion.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
              </option>
            ))}
          </select>

          {/* Precio */}
          <input
            type="number"
            name="precio"
            placeholder="Precio ($)"
            className="input input-bordered w-full"
            value={newRate.precio}
            onChange={handleChange}
            required
            step="0.01"
            min="0"
          />

          {/* Fechas */}
          <input
            type="date"
            name="fechaInicio"
            className="input input-bordered w-full"
            value={newRate.fechaInicio}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="fechaFin"
            className="input input-bordered w-full"
            value={newRate.fechaFin}
            onChange={handleChange}
            required
          />

          <div className="md:col-span-2">
            <button
              type="submit"
              className={`btn btn-primary w-full ${
                isSubmitting ? "loading" : ""
              }`}
              disabled={isSubmitting || !newRate.hotelId}
            >
              {isSubmitting ? "Guardando..." : "Guardar Nueva Tarifa"}
            </button>
          </div>
        </div>
      </form>

      {/* ⚠️ NOTA: Listado de Tarifas Existentes (TODO: GET /rates o similar) */}
      <div className="alert alert-info">
        La visualización de tarifas existentes (lectura) requiere un endpoint
        GET /rates en el microservicio .NET que aún no se ha especificado.
      </div>
    </div>
  );
};

export default RateTab;
