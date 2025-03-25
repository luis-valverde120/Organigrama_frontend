'use client';
import { useState, useEffect } from "react";
import { Nodo } from "@/app/utils/Utils";
import { useRouter } from "next/navigation";
import { API_URL } from "@/app/services/api";

export default function ModalEliminar({ idOrganigrama }: { idOrganigrama: number }) {
  const [selectedNodo, setSelectedNodo] = useState<number | null>(null);
  const [nodos, setNodos] = useState<Nodo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchNodos = async () => {
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        console.error("No access token found");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/nodos/${idOrganigrama}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch nodos");
        }

        const data = await response.json();
        setNodos(data); // Assuming the API returns an array of nodes
      } catch (err: any) {
        console.error("Error fetching nodos:", err);
        setError(err.message || "Error fetching nodos");
      }
    };

    fetchNodos();
  }, [idOrganigrama]);

  const handleEliminarNodo = async () => {
    setError(null);
    setSuccess(false);

    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      setError("No se encontró el token de acceso. Por favor, inicia sesión.");
      return;
    }

    if (!selectedNodo) {
      setError("Por favor selecciona un nodo para eliminar.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/nodo/${selectedNodo}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el nodo");
      }

      setSuccess(true);
      setSelectedNodo(null);

      // Refresh the page or fetch the updated list of nodes
      router.push(`/organigrama/${idOrganigrama}`);
    } catch (err: any) {
      console.error("Error al eliminar el nodo:", err);
      setError(err.message || "Error al eliminar el nodo");
    }
  };

  return (
    <div>
      <button className="btn btn-error" onClick={() => {
        const modal = document.getElementById('modal_eliminar') as HTMLDialogElement | null;
        if (modal) modal.showModal();
      }}>Eliminar Nodo</button>

      <dialog id="modal_eliminar" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-4">Eliminar Nodo</h1>
            <form className="w-full max-w-sm">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="selectNodo">
                  Seleccionar Nodo
                </label>
                <select
                  id="selectNodo"
                  className="select w-full"
                  value={selectedNodo || ""}
                  onChange={(e) => setSelectedNodo(Number(e.target.value))}
                >
                  <option value="">Seleccione un nodo</option>
                  {nodos.map((nodo) => (
                    <option key={nodo.id} value={nodo.id}>
                      {nodo.nombre}
                    </option>
                  ))}
                </select>
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              {success && <p className="text-green-500 text-sm mb-4">Nodo eliminado exitosamente</p>}
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="btn btn-error w-full"
                  onClick={handleEliminarNodo}
                >
                  Eliminar Nodo
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}