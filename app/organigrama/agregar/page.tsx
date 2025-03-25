'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [nombreOrganigrama, setNombreOrganigrama] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      setError("No se encontró el token de acceso. Por favor, inicia sesión.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/organigrama", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ nombre: nombreOrganigrama }),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el organigrama");
      }

      setSuccess(true);
      setNombreOrganigrama("");

      // Refresh the entire page
      router.refresh();
      router.prefetch("/organigrama");
      router.push("/organigrama");
    } catch (err: any) {
      console.error("Error al agregar el organigrama:", err);
      setError(err.message || "Error al agregar el organigrama");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Agregar Organigrama</h1>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="mb-4 max-sm:px-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombreOrganigrama">
            Nombre de Organigrama
          </label>
          <input
            type="text"
            id="nombreOrganigrama"
            placeholder="Nombre del organigrama"
            className="input w-full"
            value={nombreOrganigrama}
            onChange={(e) => setNombreOrganigrama(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">Organigrama agregado exitosamente</p>}
        <div className="flex items-center justify-between max-sm:px-5">
          <button type="submit" className="btn btn-primary w-full">
            Agregar Organigrama
          </button>
        </div>
      </form>
    </div>
  );
}