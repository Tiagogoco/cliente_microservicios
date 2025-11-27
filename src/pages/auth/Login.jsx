// src/pages/auth/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Necesitas instalar react-router-dom
import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../api/auth";
// Importa un ícono de React (ej. react-icons) o usa un SVG simple
import { FaPlaneDeparture } from "react-icons/fa";

const Login = () => {
  // 1. Usar el hook de autenticación
  const { login } = useAuth();
  const navigate = useNavigate();

  // 2. Estados para el formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validar que los campos no estén vacíos
    if (!email || !password) {
      setError("Por favor, ingresa correo y contraseña.");
      setIsLoading(false);
      return;
    }

    try {
      // 3. Llamar a la función del servicio API
      const token = await loginUser(email, password);

      // 4. Si es exitoso, actualizar el Contexto
      login(token);

      // 5. Redirigir al panel principal
      navigate("/home");
    } catch (err) {
      // Manejar errores (ej. Credenciales inválidas [cite: 140])
      setError(
        err.message || "Fallo la conexión con el servicio de autenticación."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="card w-full max-w-sm shadow-xl bg-white p-8">
        {/* Ícono y Título, siguiendo el mockup  */}
        <div className="flex flex-col items-center mb-8">
          <FaPlaneDeparture className="text-blue-500 text-4xl mb-2" />
          <h2 className="text-xl font-semibold text-blue-300">Travelink</h2>
          <p className="text-gray-500 text-sm mt-6">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Campo de Correo Electrónico  */}
          <div className="mb-4">
            <label className="label">
              <span className="label-text">Correo electrónico </span>
            </label>
            <input
              type="email"
              placeholder="angel.montero@alumno.buap.mx"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Campo de Contraseña */}
          <div className="mb-6">
            <label className="label">
              <span className="label-text">Contraseña</span>
            </label>
            <input
              type="password"
              placeholder="•••"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Mensaje de Error */}
          {error && <p className="text-error text-center mb-4">{error}</p>}

          {/* Botón de Ingresar */}
          <button
            type="submit"
            className={`btn btn-primary w-full ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Ingresando..." : "Ingresar"}
          </button>

          {/* Enlace de Registro */}
          <p className="text-center mt-4 text-sm">
            ¿No tienes cuenta?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Regístrate
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
