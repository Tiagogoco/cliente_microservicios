// src/pages/ReserveConfirm.jsx
import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Layout from "../../components/ui/Layout";
import { createBooking } from "../../api/booking"; // 👈 Importar el nuevo servicio

const ReserveConfirm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Obtener datos del estado de navegación
  const { hotel, numNights, totalPrice } = location.state || {};

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Si faltan datos (ej. si el usuario entra a la URL directamente), redirigir
  if (!hotel) {
    return <Navigate to="/home" replace />;
  }

  const format = (date) =>
    date ? new Date(date).toLocaleDateString("es-MX") : "N/A";

  // Función para procesar la reserva (Llamada a POST /reservas en PHP)
  const handleConfirmBooking = async () => {
    setError("");
    setIsLoading(true);

    const bookingData = {
      hotel_id: hotel.id,
      // ⚠️ NOTA: Las fechas deben venir de Home, aquí las simulamos por simplicidad.
      check_in: "2025-11-20",
      check_out: "2025-11-23",
      total_price: totalPrice,
    };

    try {
      const result = await createBooking(bookingData);

      // Si la reserva es exitosa, mostrar mensaje y redirigir a Mis Reservas
      alert(`Reserva confirmada! Código: ${result.confirmation_code}`);
      navigate("/bookings");
    } catch (err) {
      console.error(err);
      setError(
        err.message ||
          "La reserva falló. El pago fue rechazado o no hay disponibilidad."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Confirmación de Reserva
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna 1 y 2: Detalles de la Reserva y Pago */}
          <div className="lg:col-span-2">
            {/* Detalle del Hotel */}
            <div className="card bg-white shadow-xl mb-6">
              <div className="card-body">
                <h2 className="card-title text-2xl">{hotel.name}</h2>
                <p className="text-gray-500">{hotel.location}</p>
                <p className="mt-4">
                  <span className="font-semibold">Noches:</span> {numNights} |
                  <span className="font-semibold ml-4">Precio/Noche:</span> $
                  {hotel.pricePerNight}
                </p>
              </div>
            </div>

            {/* Simulación de Pago */}
            <div className="card bg-white shadow-xl mb-6 p-6">
              <h3 className="text-xl font-semibold mb-4">Método de Pago</h3>
              <div className="alert alert-info">
                La lógica de pago será coordinada internamente por los
                microservicios (.NET). Este formulario simula la captura de
                datos.
              </div>
              <input
                type="text"
                placeholder="Número de tarjeta (simulado)"
                className="input input-bordered w-full my-4"
              />
              {/* ... más campos de pago ... */}
            </div>

            {error && (
              <div role="alert" className="alert alert-error mb-4">
                <span className="text-sm">{error}</span>
              </div>
            )}
          </div>

          {/* Columna 3: Resumen Final y Botón de Confirmación */}
          <div className="lg:col-span-1 p-6 bg-blue-50 rounded-lg shadow-inner sticky top-4 self-start">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Resumen del Pedido
            </h3>

            {/* Detalle de precios */}
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">
                Subtotal ({numNights} noches)
              </span>
              <span className="font-medium">${totalPrice}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Impuestos y Servicios</span>
              <span className="font-medium text-green-600">Incluidos</span>
            </div>

            <div className="flex justify-between pt-4 pb-6">
              <span className="text-xl font-bold">Total a Pagar</span>
              <span className="text-2xl font-bold text-blue-600">
                ${totalPrice}
              </span>
            </div>

            {/* Botón Confirmar */}
            <button
              onClick={handleConfirmBooking}
              className={`btn btn-lg btn-success w-full ${
                isLoading ? "loading" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Procesando Pago..." : "Confirmar y Pagar"}
            </button>
          </div>
        </div>
        <div className="mt-6 text-center">
          <Link to={`/hotel/${hotel.id}`} className="btn btn-ghost">
            ← Volver a Detalles
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ReserveConfirm;
