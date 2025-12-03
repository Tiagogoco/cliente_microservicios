import React from "react";
import Layout from "../components/ui/Layout";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Dashboard de Administración
        </h1>
        <p className="text-gray-600 mb-8">
          Bienvenido, {user?.name || "Administrador"}. Gestiona las reservas y
          el inventario de Travelink.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tarjeta 1: Gestión de Inventario (Caso de uso: Gestionar hoteles) */}
          <Link
            to="/admin/management"
            className="card bg-white shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-[1.02] cursor-pointer"
          >
            <div className="card-body">
              <h2 className="card-title text-blue-600">
                🏨 Gestión de Hoteles
              </h2>
              <p>
                Agregar, modificar o eliminar hoteles, habitaciones y tarifas.
              </p>
              <div className="card-actions justify-end">
                <span className="btn btn-sm btn-info">Ir a Inventario</span>
              </div>
            </div>
          </Link>

          {/* Tarjeta 2: Reportes y Analíticas (Caso de uso: Ver reportes de ocupación) */}
          <Link
            to="/admin/reports"
            className="card bg-white shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-[1.02] cursor-pointer"
          >
            <div className="card-body">
              <h2 className="card-title text-green-600">
                📊 Reportes de Ocupación
              </h2>
              <p>Visualizar estadísticas y métricas de uso del sistema.</p>
              <div className="card-actions justify-end">
                <span className="btn btn-sm btn-success">Ver Analíticas</span>
              </div>
            </div>
          </Link>

          {/* Tarjeta 3: Pagos y Notificaciones (Casos de uso: Capturar pago, Enviar Webhook) */}
          <Link
            to="/admin/payments"
            className="card bg-white shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-[1.02] cursor-pointer"
          >
            <div className="card-body">
              <h2 className="card-title text-purple-600">
                💳 Pagos y Webhooks
              </h2>
              <p>Simular captura de pagos y enviar notificaciones a socios.</p>
              <div className="card-actions justify-end">
                <span className="btn btn-sm btn-warning">Ir a Pagos</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
