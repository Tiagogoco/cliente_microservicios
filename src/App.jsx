// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import Results from "./pages/Results.jsx";
import HotelDetail from "./pages/HotelDetail.jsx";
import ReserveConfirm from "./pages/auth/ReserveConfirm.jsx";
import MyBookings from "./pages/MyBooking.jsx";
import BookingDetail from "./pages/BookingDetail.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import InventoryManagement from "./pages/admin/InventoryManagement.jsx";

function App() {
  return (
    <Routes>
      {/* 1. Ruta de Login: Muestra el componente Login en /login */}
      <Route path="/login" element={<Login />} />

      {/* 2. Ruta de Registro */}
      <Route path="/register" element={<Register />} />

      {/* 3. Ruta Raíz: Redirige a /login para empezar, o a la Home si está logueado */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Rutas Protegidas */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home /> {/* Home.jsx solo se carga si isAuthenticated es true */}
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard /> {/* Destino del login de admin */}
          </AdminRoute>
        }
      />

      <Route
        path="/admin/management"
        element={
          <AdminRoute>
            <InventoryManagement />
          </AdminRoute>
        }
      />

      <Route
        path="/results"
        element={
          <ProtectedRoute>
            <Results />
          </ProtectedRoute>
        }
      />
      <Route
        path="/hotel/:id"
        element={
          <ProtectedRoute>
            <HotelDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reserve/:id"
        element={
          <ProtectedRoute>
            <ReserveConfirm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/bookings"
        element={
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bookings/:id"
        element={
          <ProtectedRoute>
            <BookingDetail />
          </ProtectedRoute>
        }
      />

      {/* Ruta para manejar URLs no encontradas */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
