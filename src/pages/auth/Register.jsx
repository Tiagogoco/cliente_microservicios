// src/pages/auth/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth";
import { FaPlaneDeparture } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();

  // Estados para el formulario de registro
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    // 1. Validaciones del lado del cliente
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      setIsLoading(false);
      return;
    }

    const userData = { name, email, password };

    try {
      // 2. Llamar a la función del servicio API
      const result = await registerUser(userData);

      // 3. Mostrar mensaje de éxito y limpiar formulario
      setSuccessMessage(
        result.message || "¡Registro exitoso! Ya puedes iniciar sesión."
      );
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Opcional: Redirigir al login después de un tiempo
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      // Manejar errores (ej. Correo duplicado o datos incompletos)
      setError(err.message || "Fallo el registro. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="card w-full max-w-md shadow-xl bg-white p-8">
        <div className="flex flex-col items-center mb-6">
          <FaPlaneDeparture className="text-blue-500 text-4xl mb-2" />
          <h2 className="text-xl font-semibold text-blue-300">Travelink</h2>
          <p className="text-gray-500 text-sm">
            Crea tu cuenta para acceder al sistema
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Campo de Nombre */}
          <div className="mb-4">
            <label className="label">
              <span className="label-text">Nombre completo</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Campo de Correo Electrónico */}
          <div className="mb-4">
            <label className="label">
              <span className="label-text">Correo electrónico</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Campo de Contraseña */}
          <div className="mb-4">
            <label className="label">
              <span className="label-text">Contraseña</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Campo de Confirmar Contraseña */}
          <div className="mb-6">
            <label className="label">
              <span className="label-text">Confirmar Contraseña</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Mensajes de feedback */}
          {error && (
            <div role="alert" className="alert alert-error mb-4">
              <span className="text-sm">{error}</span>
            </div>
          )}
          {successMessage && (
            <div role="alert" className="alert alert-success mb-4">
              <span className="text-sm">{successMessage}</span>
            </div>
          )}

          {/* Botón de Registro */}
          <button
            type="submit"
            className={`btn btn-primary w-full ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Registrando..." : "Crear Cuenta"}
          </button>

          {/* Enlace de Login */}
          <p className="text-center mt-4 text-sm">
            ¿Ya tienes cuenta?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Iniciar Sesión
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
