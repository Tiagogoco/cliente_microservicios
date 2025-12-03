// src/components/bookings/BookingCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const BookingCard = ({ booking, onCancel }) => {
  // Función para determinar el estilo de la etiqueta de estado (Badge)
  const getStatusBadge = (status) => {
    const statusLower = status.toLowerCase();
    let colorClass = "badge-info"; // Por defecto

    if (statusLower === "confirmada") {
      colorClass = "badge-success";
    } else if (statusLower === "pendiente") {
      colorClass = "badge-warning";
    } else if (statusLower === "cancelada") {
      colorClass = "badge-error";
    }

    return (
      <div
        className={`badge ${colorClass} text-white font-semibold capitalize`}
      >
        {status}
      </div>
    );
  };

  const format = (date) =>
    date
      ? new Date(date).toLocaleDateString("es-MX", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "N/A";

  return (
    <div className="card card-side bg-white shadow-xl border border-gray-200 mb-6 p-4">
      <figure className="w-48 hidden md:block">
        {/* Imagen de hotel (Simulada, idealmente del servicio de .NET) */}
        <img
          src="/images/hotel_booking_placeholder.jpg"
          alt="Hotel"
          className="w-full h-full object-cover rounded-lg"
        />
      </figure>

      <div className="card-body p-0 md:pl-6 flex flex-col md:flex-row justify-between">
        {/* Columna de Detalles */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h2 className="card-title text-xl text-blue-600">
              {booking.hotelName}
            </h2>
            {getStatusBadge(booking.status)}
          </div>
          <p className="text-gray-500 mb-4">{booking.location}</p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold">Check-in</p>
              <p className="text-gray-700">{format(booking.checkIn)}</p>
            </div>
            <div>
              <p className="font-semibold">Check-out</p>
              <p className="text-gray-700">{format(booking.checkOut)}</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Código de confirmación: {booking.confirmationCode}
          </p>
        </div>

        {/* Columna de Resumen y Acciones */}
        <div className="md:w-60 flex flex-col justify-center items-end border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-4 mt-4 md:mt-0">
          <p className="text-2xl font-bold text-gray-800">
            Total: ${booking.totalPrice}
          </p>

          <div className="flex space-x-2 mt-4">
            <Link
              to={`/bookings/${booking.id}`}
              className="btn btn-sm btn-outline btn-info"
            >
              Ver Detalles
            </Link>
            {booking.status.toLowerCase() !== "cancelada" && (
              <button
                onClick={() => onCancel(booking.id)}
                className="btn btn-sm btn-outline btn-error"
              >
                Cancelar Reserva
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
