// src/pages/BookingDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/ui/Layout";
import { getBookingDetail } from "../api/booking";

const DUMMY_BOOKING = {
  id: 1,
  hotelName: "Hotel Gran Luxe",
  location: "Ciudad de México",
  checkIn: "2025-11-19",
  checkOut: "2025-11-22",
  totalPrice: 450,
  confirmationCode: "TRV-2024-001",
  status: "Confirmada",
  roomType: "Suite Ejecutiva",
  paymentStatus: "Pagado (Tarjeta ****1234)",
  notes: "Solicitud de cuna para bebé.",
};

const BookingDetail = () => {
  const { id } = useParams(); // Obtener el ID de la URL
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const format = (date) =>
    date
      ? new Date(date).toLocaleDateString("es-MX", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "N/A";

  useEffect(() => {
    const fetchDetail = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // ⚠️ Descomentar cuando el backend de PHP esté listo
        // const data = await getBookingDetail(id);
        // setBooking(data);

        // Usar datos simulados para desarrollo
        await new Promise((resolve) => setTimeout(resolve, 500));
        setBooking(DUMMY_BOOKING);
      } catch (err) {
        setError(err.message || `No se pudo encontrar la reserva ${id}.`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-48">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div role="alert" className="alert alert-error max-w-4xl mx-auto my-6">
          {error}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Detalle de Reserva #{booking.confirmationCode}
        </h1>

        <div className="card bg-white shadow-xl p-6 mb-8">
          {/* Sección 1: Hotel y Fechas */}
          <h2 className="text-2xl font-bold mb-4 text-blue-600">
            {booking.hotelName}
          </h2>
          <p className="text-gray-500 mb-4">{booking.location}</p>

          <div className="grid grid-cols-2 gap-4 border-b pb-4 mb-4">
            <div>
              <p className="font-semibold">Check-in:</p>
              <p>{format(booking.checkIn)}</p>
            </div>
            <div>
              <p className="font-semibold">Check-out:</p>
              <p>{format(booking.checkOut)}</p>
            </div>
          </div>

          {/* Sección 2: Información General */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="font-semibold">Tipo de Habitación:</p>
              <p>{booking.roomType}</p>
            </div>
            <div>
              <p className="font-semibold">Estado:</p>
              <span className="badge badge-success text-white capitalize">
                {booking.status}
              </span>
            </div>
            <div>
              <p className="font-semibold">Código de Confirmación:</p>
              <p>{booking.confirmationCode}</p>
            </div>
            <div>
              <p className="font-semibold">Estado de Pago:</p>
              <p>{booking.paymentStatus}</p>
            </div>
          </div>

          {/* Sección 3: Precio */}
          <div className="flex justify-between items-center pt-4 border-t">
            <span className="text-xl font-bold">Total Pagado</span>
            <span className="text-3xl font-bold text-green-600">
              ${booking.totalPrice}
            </span>
          </div>
        </div>

        <div className="text-center">
          <Link to="/bookings" className="btn btn-ghost">
            ← Volver a Mis Reservas
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default BookingDetail;
