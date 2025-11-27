// src/pages/Results.jsx
import React from "react";
import { useLocation, Link } from "react-router-dom";
import Layout from "../components/ui/Layout";
import HotelListItem from "../components/hotels/HotelListItem";

const Results = () => {
  // 1. Recuperar los datos pasados desde la navegación
  const location = useLocation();

  // Desestructurar los datos o establecer un valor por defecto si no existen
  const {
    results: availableHotels = [],
    destination,
    checkIn,
    checkOut,
  } = location.state || {};

  // 2. Determinar si se encontraron resultados
  const foundResults = availableHotels.length > 0;

  // 3. Formatear las fechas para la visualización
  const format = (date) =>
    date ? new Date(date).toLocaleDateString("es-MX") : "N/A";

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6">
        {/* Encabezado y resumen de la búsqueda */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Resultados de búsqueda
        </h1>
        <p className="text-gray-600 mb-8">
          {destination && <span className="font-semibold">{destination}</span>}
          {checkIn && checkOut && (
            <span>
              {" "}
              | Check-in: {format(checkIn)} - Check-out: {format(checkOut)}
            </span>
          )}
        </p>

        {/* Contenido principal: Resultados o Mensaje de No Disponibilidad */}
        {foundResults ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 4. Mapear y Renderizar las Cards (Mockup page 37) */}
            {availableHotels.map((hotel) => (
              // Asumimos que el objeto 'hotel' de la API es compatible con HotelListItem
              // Si la API de .NET devuelve un formato diferente, ajusta las props aquí.
              <HotelListItem key={hotel.id} hotel={hotel} />
            ))}
          </div>
        ) : (
          /* Mensaje si no hay resultados */
          <div className="alert alert-warning shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.398 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>
                ¡Vaya! No encontramos disponibilidad para estas fechas. Intenta
                con otro destino o rango.
              </span>
            </div>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link to="/home" className="btn btn-ghost">
            ← Volver a la búsqueda
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Results;
