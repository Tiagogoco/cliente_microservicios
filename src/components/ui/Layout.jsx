// src/components/ui/Layout.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaPlaneDeparture } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Layout = ({ children }) => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar (Header) */}
      <header className="navbar bg-white shadow-sm px-8">
        <div className="flex-1">
          <Link
            to="/home"
            className="flex items-center text-xl font-bold text-blue-600"
          >
            <FaPlaneDeparture className="mr-2" /> Travelink
          </Link>
        </div>
        <div className="flex-none space-x-4">
          <Link to="/bookings" className="btn btn-ghost">
            Mis Reservas
          </Link>
          <button onClick={logout} className="btn btn-sm btn-outline btn-error">
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Contenido de la Página */}
      <main className="p-4 md:p-8">{children}</main>
    </div>
  );
};

export default Layout;
