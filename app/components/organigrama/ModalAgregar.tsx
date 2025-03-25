'use client';
import { useState, useEffect } from "react";
import { Nodo } from "@/app/utils/Utils";
import { useRouter } from "next/navigation";
import { API_URL } from "@/app/services/api";

export default function ModalAgregar({ idOrganigrama }: { idOrganigrama: number }) {
  const [nombreNodo, setNombreNodo] = useState("");
  const [tituloNodo, setTituloNodo] = useState("");
  const [nodoPadre, setNodoPadre] = useState<number | null>(null);
  const [tipoCargo, setTipoCargo] = useState("");
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

  const handleAgregarNodo = async () => {
    setError(null);
    setSuccess(false);

    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      setError("No se encontró el token de acceso. Por favor, inicia sesión.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/nodo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          nombre: nombreNodo,
          titulo: tituloNodo,
          padre_id: nodoPadre,
          organigrama_id: idOrganigrama,
          tipo_cargo: tipoCargo,
        }),
      });


      if (!response.ok) {
        throw new Error("Error al agregar el nodo");
      }

      setSuccess(true);
      setNombreNodo("");
      setTituloNodo("");
      setNodoPadre(null);
      setTipoCargo("");

      router.push(`/organigrama/${idOrganigrama}`);
    
    } catch (err: any) {
      console.error("Error al agregar el nodo:", err);
      setError(err.message || "Error al agregar el nodo");
    }
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={() => {
        const modal = document.getElementById('my_modal_3') as HTMLDialogElement | null;
        if (modal) modal.showModal();
      }}>Agregar Nodo</button>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-4">Agregar Nodo</h1>
            <form className="w-full max-w-sm">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombreNodo">
                  Nombre del Nodo
                </label>
                <input
                  type="text"
                  id="nombreNodo"
                  placeholder="Nombre del nodo"
                  className="input w-full"
                  value={nombreNodo}
                  onChange={(e) => setNombreNodo(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tituloNodo">
                  Título del Nodo
                </label>
                <input
                  type="text"
                  id="tituloNodo"
                  placeholder="Título del nodo"
                  className="input w-full"
                  value={tituloNodo}
                  onChange={(e) => setTituloNodo(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nodoPadre">
                  Nodo Padre
                </label>
                <select
                  id="nodoPadre"
                  className="select w-full"
                  value={nodoPadre || ""}
                  onChange={(e) => setNodoPadre(Number(e.target.value))}
                >
                  <option value="">Sin Nodo Padre</option>
                  {nodos.map((nodo) => (
                    <option key={nodo.id} value={nodo.id}>
                      {nodo.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tipoCargo">
                  Tipo de Cargo
                </label>
                <select
                  id="tipoCargo"
                  className="select w-full"
                  value={tipoCargo}
                  onChange={(e) => setTipoCargo(e.target.value)}
                >
                  <option value="">Seleccione un tipo</option>
                  <option value="directo">Directo</option>
                  <option value="asesoría">Asesoría</option>
                </select>
              </div>
      
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              {success && <p className="text-green-500 text-sm mb-4">Nodo agregado exitosamente</p>}
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  onClick={handleAgregarNodo}
                >
                  Agregar Nodo
                </button>
              </div>
            </form>
          </div>
        </div >
      </dialog >
    </div >
  );
}