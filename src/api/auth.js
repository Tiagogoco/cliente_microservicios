// src/api/auth.js

// Definir la URL base de tu API Gateway (ajusta esto según tu entorno Docker Compose)
const API_BASE_URL = "http://localhost:8000/api"; // Ejemplo: Puerto del API Gateway/Kong

/**
 * Realiza la solicitud de inicio de sesión a la API.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<string>} Retorna el token JWT si es exitoso.
 */
export async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // PHP valida credenciales y genera el token JWT [cite: 140]
    const data = await response.json();

    if (!response.ok) {
      // Manejar excepciones como 'Credenciales inválidas' [cite: 140]
      throw new Error(
        data.message || "Error al iniciar sesión. Verifica tus credenciales."
      );
    }

    // El sistema devuelve el token al cliente [cite: 140]
    // Asumiendo que el cuerpo de la respuesta contiene { token: '...' }
    return data.token;
  } catch (error) {
    console.error("API Error (Login):", error);
    throw error;
  }
}

/**
 * Realiza la solicitud de registro a la API.
 * @param {object} userData - Datos personales del usuario.
 * @returns {Promise<object>} Retorna la confirmación del registro.
 */
export async function registerUser(userData) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    // PHP valida los datos y crea el usuario en la base de datos [cite: 133]
    const data = await response.json();

    if (!response.ok) {
      // Manejar excepciones como 'Datos incompletos o correo duplicado' [cite: 133]
      throw new Error(data.message || "Error al registrar usuario.");
    }

    // El sistema devuelve un mensaje de confirmación [cite: 133]
    return data;
  } catch (error) {
    console.error("API Error (Register):", error);
    throw error;
  }
}
