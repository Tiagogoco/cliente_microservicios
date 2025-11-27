// src/pages/Home.jsx
import React, { useState } from "react";
import Layout from "../components/ui/Layout";
import HotelListItem from "../components/hotels/HotelListItem";
import { getAvailability } from "../api/inventory";
import { useNavigate } from "react-router-dom"; //

const Home = () => {
  // Estados para el formulario de búsqueda
  const navigate = useNavigate(); //
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Datos simulados para mostrar en el Home
  const DUMMY_HOTELS = [
    {
      id: 1,
      name: "Hotel Gran Luxe",
      price: 150,
      imageUrl: "/images/gran-luxe.jpg",
    },
    {
      id: 2,
      name: "Paradise Beach Resort",
      price: 200,
      imageUrl: "/images/paradise.jpg",
    },
    {
      id: 3,
      name: "Modern City Hotel",
      price: 120,
      imageUrl: "/images/city_hotel.jpg",
    },
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Llamada al microservicio de .NET
      const results = await getAvailability(checkIn, checkOut, destination);

      // Si la llamada es exitosa:
      // 1. Redirigir a una nueva página (/results)
      // 2. Pasar los resultados y los parámetros de búsqueda a la nueva página (usando state)
      navigate("/results", {
        state: { results, checkIn, checkOut, destination },
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "No fue posible obtener la disponibilidad.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="hero bg-base-200 p-10 rounded-lg shadow-md">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">
              Encuentra tu próximo destino
            </h1>
          </div>
        </div>
      </div>

      {/* Formulario de Búsqueda (Mockup page 36) */}
      <div className="mt-8 flex justify-center">
        <div className="card w-full max-w-4xl shadow-xl bg-white p-6 md:p-10">
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
          >
            {/* Destino */}
            <div className="md:col-span-4">
              <label className="label">
                <span className="label-text font-semibold">Destino</span>
              </label>
              <input
                type="text"
                placeholder="¿A dónde quieres viajar?"
                className="input input-bordered w-full"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
            </div>

            {/* Fecha de Check-in */}
            <div className="md:col-span-1">
              <label className="label">
                <span className="label-text font-semibold">
                  Fecha de Check-in
                </span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                required
              />
            </div>

            {/* Fecha de Check-out */}
            <div className="md:col-span-1">
              <label className="label">
                <span className="label-text font-semibold">
                  Fecha de Check-out
                </span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required
              />
            </div>

            {/* Botón Buscar */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className={`btn btn-primary w-full h-12 ${
                  isLoading ? "loading" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Buscando..." : "Buscar"}
              </button>
            </div>

            {/* Mostrar error si la búsqueda falla */}
            {error && (
              <p className="text-error text-center mt-4 md:col-span-4">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">
          Hoteles en tendencia
        </h2>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DUMMY_HOTELS.map((hotel) => (
            <HotelListItem key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
