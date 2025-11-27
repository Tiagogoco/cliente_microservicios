import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/ui/Layout";
// import { getHotelDetails } from '../api/inventory';

// Datos simulados (Reemplazar con llamada a la API de .NET)
const DUMMY_HOTEL_DETAILS = {
  id: "1",
  name: "Hotel Gran Luxe",
  location: "Centro Histórico, Ciudad de México",
  rating: 4.8,
  pricePerNight: 150,
  description:
    "Experimenta el lujo y la comodidad en nuestro Hotel Gran Luxe, ubicado en el corazón de la ciudad. Nuestras habitaciones espaciosas cuentan con vistas panorámicas, camas king-size de alta calidad y baños de mármol con amenidades premium. Disfruta de nuestra piscina en la azotea, gimnasio moderno y restaurante gourmet. Perfecto para viajeros de negocios y placer que buscan una experiencia inolvidable.",
  services: [
    { name: "WiFi Gratis", icon: "📶" },
    { name: "Desayuno Incluido", icon: "☕" },
    { name: "Estacionamiento", icon: "🚗" },
    { name: "Gimnasio", icon: "🏋️" },
  ],
  gallery: ["/images/room1.jpg", "/images/room2.jpg", "/images/room3.jpg"], // URLs de imágenes
};

const HotelDetail = () => {
  const { id } = useParams(); // Obtiene el ID del hotel de la URL
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(DUMMY_HOTEL_DETAILS);
  const [numNights, setNumNights] = useState(3); // Estado para simular la selección de noches

  // Lógica para cargar datos reales (Dejar para la siguiente fase)
  /*
    useEffect(() => {
       
    }, [id]);
    */

  const totalPrice = hotel.pricePerNight * numNights;

  // Función que inicia el flujo de reserva
  const handleReserve = () => {
    navigate(`/reserve/${hotel.id}`, {
      state: { hotel, numNights, totalPrice },
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 bg-white shadow-lg rounded-lg">
        {/* Columna 1 y 2: Detalles del Hotel */}
        <div className="lg:col-span-2">
          {/* Título y Ubicación (Mockup page 38) */}
          <h1 className="text-3xl font-bold mb-1">{hotel.name}</h1>
          <p className="text-gray-500 mb-6 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {hotel.location} ⭐ {hotel.rating}
          </p>

          {/* Galería (Usando una imagen principal de ejemplo del mockup) */}
          <div className="mb-8 max-w-xl mx-auto">
            <img
              src="/images/room3.jpg"
              alt="Hotel Room"
              className="w-full rounded-lg shadow-md"
            />
          </div>

          {/* Descripción (Mockup page 39) */}
          <h2 className="text-2xl font-semibold mb-3">Descripción</h2>
          <p className="text-gray-600 mb-8">{hotel.description}</p>

          {/* Servicios (Mockup page 39) */}
          <h2 className="text-2xl font-semibold mb-3">Servicios</h2>
          <div className="flex space-x-8 mb-8">
            {hotel.services.map((service, index) => (
              <div key={index} className="text-center">
                <span className="text-3xl p-3 bg-blue-50 rounded-full inline-block mb-1">
                  {service.icon}
                </span>
                <p className="text-sm text-gray-700">{service.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Columna 3: Resumen de Reserva (Sidebar) */}
        <div className="lg:col-span-1 p-6 bg-blue-50 rounded-lg shadow-inner sticky top-4 self-start">
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            Resumen de Reserva
          </h3>

          {/* Selector de noches (Simulado) */}
          <div className="mb-4">
            <label className="label">
              <span className="label-text">Noches:</span>
              <select
                className="select select-bordered select-sm"
                value={numNights}
                onChange={(e) => setNumNights(parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Detalle de precios (Mockup page 38) */}
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">
              ${hotel.pricePerNight} x {numNights} noches
            </span>
            <span className="font-medium">${totalPrice}</span>
          </div>

          <div className="flex justify-between pt-4 pb-6">
            <span className="text-xl font-bold">Precio Final</span>
            <span className="text-xl font-bold text-green-600">
              ${totalPrice}
            </span>
          </div>

          {/* Botón Reservar Ahora (Acción principal) */}
          <button
            onClick={handleReserve}
            className="btn btn-lg btn-primary w-full"
          >
            Reservar Ahora
          </button>

          <p className="text-xs text-center text-gray-500 mt-3">
            Pago seguro y protección al viajero incluida
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default HotelDetail;
