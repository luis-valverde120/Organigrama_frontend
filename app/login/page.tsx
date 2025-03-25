'use client';
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie"; 
import { API_URL } from "../services/api";

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });

      if (response.status === 200) {
        const { access_token, refresh_token } = response.data;

        Cookies.set("access_token", access_token, { expires: 1, path: '/' }); // La cookie expira en 1 día
        Cookies.set("refresh_token", refresh_token, { expires: 1, path: '/' });

        // Save tokens in localStorage
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);

        // Redirect to organigrama
        window.location.href = "/organigrama";
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Iniciar Sesión</h1>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="mb-4 max-sm:px-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="nombre de usuario"
            className="input w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4 max-sm:px-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            placeholder="contraseña"
            className="input w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="flex items-center justify-between max-sm:px-5">
          <button type="submit" className="btn btn-primary w-full">
            Iniciar Sesión
          </button>
        </div>
      </form>
      <div className="mt-4">
        <p className="text-gray-600 text-sm">
          ¿No tienes una cuenta?{" "}
          <Link className="text-blue-500 hover:text-blue-800" href="register">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}

