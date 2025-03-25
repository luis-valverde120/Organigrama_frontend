'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/app/services/api";

export default function Page() {
  const [username, setUsername] = useState("");
  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const passwordsMatch = password === confirmPassword && password.length > 0;
  const allFieldsCompleted =
    username.trim() !== "" &&
    correo.trim() !== "" &&
    nombre.trim() !== "" &&
    password.trim() !== "" &&
    confirmPassword.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!passwordsMatch) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, correo, nombre, password }),
      });

      if (!response.ok) {
        throw new Error("Error al registrar el usuario");
      }

      setSuccess(true);
      setUsername("");
      setCorreo("");
      setNombre("");
      setPassword("");
      setConfirmPassword("");

      // Redirect to login page
      router.push("/login");
    } catch (err: any) {
      console.error("Error al registrar el usuario:", err);
      setError(err.message || "Error al registrar el usuario");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Registro</h1>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="mb-4 max-sm:px-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Nombre de Usuario
          </label>
          <input
            type="text"
            id="username"
            placeholder="Nombre de usuario"
            className="input w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4 max-sm:px-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            placeholder="Correo electrónico"
            className="input w-full"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>
        <div className="mb-4 max-sm:px-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nombre Completo
          </label>
          <input
            type="text"
            id="name"
            placeholder="Nombre completo"
            className="input w-full"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-4 max-sm:px-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            placeholder="Contraseña"
            className="input w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4 max-sm:px-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirmar Contraseña
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirmar contraseña"
            className={`input w-full ${
              confirmPassword.length > 0
                ? passwordsMatch
                  ? "border-green-500"
                  : "border-red-500"
                : ""
            }`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {!passwordsMatch && confirmPassword.length > 0 && (
            <p className="text-red-500 text-sm mt-1">Las contraseñas no coinciden.</p>
          )}
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">Usuario registrado exitosamente</p>}
        <div className="flex items-center justify-between max-sm:px-5">
          <button
            type="submit"
            className={`btn w-full ${
              passwordsMatch && allFieldsCompleted ? "btn-primary" : "btn-disabled"
            }`}
            disabled={!passwordsMatch || !allFieldsCompleted}
          >
            Registrarse
          </button>
        </div>
      </form>
      <div className="mt-4">
        <p className="text-gray-600 text-sm">
          ¿Ya tienes una cuenta?{" "}
          <a className="text-blue-500 hover:text-blue-800" href="/login">
            Inicia Sesión
          </a>
        </p>
      </div>
    </div>
  );
}