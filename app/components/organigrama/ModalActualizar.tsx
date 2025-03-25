'use client';
import { useState, useEffect } from "react";
import { Nodo } from "@/app/utils/Utils";
import { useRouter } from "next/navigation";

export default function ModalActualizar({ idOrganigrama }: { idOrganigrama: number }) {
  const [selectedNodo, setSelectedNodo] = useState<number | null>(null);
  const [nombreNodo, setNombreNodo] = useState("");
  const [tituloNodo, setTituloNodo] = useState("");
  const [nodoPadre, setNodoPadre] = useState<number | null>(null);
  const [tipoCargo, setTipoCargo] = useState("");
  const [colorTexto, setColorTexto] = useState("#000000");
  const [colorFondo, setColorFondo] = useState("#ffffff");
  const [colorBorde, setColorBorde] = useState("#000000");
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
        const response = await fetch(`http://localhost:5000/api/nodos/${idOrganigrama}`, {
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

  const handleSelectNodo = async (nodoId: number) => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/nodo/${nodoId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch nodo details");
      }

      const nodo = await response.json();
      setSelectedNodo(nodo.id);
      setNombreNodo(nodo.nombre);
      setTituloNodo(nodo.titulo || "");
      setNodoPadre(nodo.padre_id || null);
      setTipoCargo(nodo.tipo_cargo || "");
      setColorTexto(nodo.color_text || "#000000");
      setColorFondo(nodo.color_bg || "#ffffff");
      setColorBorde(nodo.color_border || "#000000");

    } catch (err: any) {
      console.error("Error fetching nodo details:", err);
      setError(err.message || "Error fetching nodo details");
    }
  };

  const handleActualizarNodo = async () => {
    setError(null);
    setSuccess(false);

    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      setError("No se encontró el token de acceso. Por favor, inicia sesión.");
      return;
    }

    if (!selectedNodo) {
      setError("Por favor selecciona un nodo para actualizar.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/nodo/${selectedNodo}`, {
        method: "PUT",
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
          color_text: colorTexto,
          color_bg: colorFondo,
          color_border: colorBorde,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el nodo");
      }

      setSuccess(true);

      router.push(`/organigrama/${idOrganigrama}`);

    } catch (err: any) {
      console.error("Error al actualizar el nodo:", err);
      setError(err.message || "Error al actualizar el nodo");
    }
  };

  return (
    <div>
      <button className="btn btn-secondary" onClick={() => {
        const modal = document.getElementById('modal_actualizar') as HTMLDialogElement | null;
        if (modal) modal.showModal();
      }}>Actualizar Nodo</button>

      <dialog id="modal_actualizar" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-4">Actualizar Nodo</h1>
            <form className="w-full max-w-sm">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="selectNodo">
                  Seleccionar Nodo
                </label>
                <select
                  id="selectNodo"
                  className="select w-full"
                  value={selectedNodo || ""}
                  onChange={(e) => handleSelectNodo(Number(e.target.value))}
                >
                  <option value="">Seleccione un nodo</option>
                  {nodos.map((nodo) => (
                    <option key={nodo.id} value={nodo.id}>
                      {nodo.nombre}
                    </option>
                  ))}
                </select>
              </div>
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
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="colorTexto">
                  Color del Texto
                </label>
                <input
                  type="color"
                  id="colorTexto"
                  className="input w-full"
                  value={colorTexto}
                  onChange={(e) => setColorTexto(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="colorFondo">
                  Color de Fondo
                </label>
                <input
                  type="color"
                  id="colorFondo"
                  className="input w-full"
                  value={colorFondo}
                  onChange={(e) => setColorFondo(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="colorBorde">
                  Color del Borde
                </label>
                <input
                  type="color"
                  id="colorBorde"
                  className="input w-full"
                  value={colorBorde}
                  onChange={(e) => setColorBorde(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              {success && <p className="text-green-500 text-sm mb-4">Nodo actualizado exitosamente</p>}
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="btn btn-secondary w-full"
                  onClick={handleActualizarNodo}
                >
                  Actualizar Nodo
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}