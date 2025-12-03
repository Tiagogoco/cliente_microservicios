// src/pages/MyBookings.jsx
import React, { useState, useEffect } from "react";
import Layout from "../components/ui/Layout";
import BookingCard from "../components/bookings/BookingCard";
import { getUserBookings, cancelBooking } from "../api/booking"; // 👈 Importar funciones de API

const DUMMY_BOOKINGS = [
  {
    id: 1,
    hotelName: "Hotel Gran Luxe",
    location: "Ciudad de México",
    checkIn: "2025-11-19",
    checkOut: "2025-11-22",
    totalPrice: 450,
    confirmationCode: "TRV-2024-001",
    status: "Confirmada",
  },
  {
    id: 2,
    hotelName: "Paradise Beach Resort",
    location: "Cancún, México",
    checkIn: "2025-12-14",
    checkOut: "2025-12-19",
    totalPrice: 1000,
    confirmationCode: "TRV-2024-002",
    status: "Pendiente",
  },
  {
    id: 3,
    hotelName: "Modern City Hotel",
    location: "Puebla, México",
    checkIn: "2025-10-01",
    checkOut: "2025-10-03",
    totalPrice: 240,
    confirmationCode: "TRV-2024-003",
    status: "Cancelada",
  },
];

const MyBookings = () => {
  const [bookings, setBookings] = useState(DUMMY_BOOKINGS); // Usar datos de muestra
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para cargar los datos reales del microservicio PHP
  const fetchBookings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // ⚠️ Cuando el backend de PHP esté listo, descomenta la siguiente línea
      // const data = await getUserBookings();
      // setBookings(data);

      // Usamos el timeout para simular la carga
      await new Promise((resolve) => setTimeout(resolve, 800));
      setBookings(DUMMY_BOOKINGS);
    } catch (err) {
      setError(err.message || "No se pudieron cargar tus reservas.");
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Función para manejar la cancelación
  const handleCancel = async (bookingId) => {
    if (
      !window.confirm("¿Estás seguro de que quieres cancelar esta reserva?")
    ) {
      return;
    }

    try {
      await cancelBooking(bookingId);
      alert("Reserva cancelada con éxito.");

      // Actualizar la lista localmente
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: "Cancelada" } : b
        )
      );
    } catch (err) {
      alert(`Error al cancelar: ${err.message}`);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Mis Reservas</h1>

        {isLoading && (
          <div className="flex justify-center items-center h-48">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        )}

        {error && (
          <div role="alert" className="alert alert-error my-4">
            <span className="text-sm">{error}</span>
          </div>
        )}

        {!isLoading && bookings.length === 0 && !error && (
          <div role="alert" className="alert alert-info">
            Aún no tienes reservas. ¡Empieza a planear tu viaje!
          </div>
        )}

        {/* Lista de Reservas */}
        <div className="flex flex-col space-y-4">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onCancel={handleCancel}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default MyBookings;
