'use client';
import ModalAgregar from "@/app/components/organigrama/ModalAgregar";
import ModalActualizar from "@/app/components/organigrama/ModalActualizar";
import ModalEliminar from "@/app/components/organigrama/ModalEliminar";
import Organigrama from "@/app/components/Organigrama";
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Nodo } from '@/app/utils/Utils';

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const id_organigrama = Array.isArray(params.id_organigrama) ? params.id_organigrama[0] : params.id_organigrama; // Ensure it's a string
  const [nodos, setNodos] = useState<Nodo[]>([]);
  const [organigramaName, setOrganigramaName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchOrganigramaName = async (id: string) => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      console.error("No access token found");
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/organigrama/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch organigrama name: ${response.statusText}`);
      }

      const data = await response.json();
      setOrganigramaName(data.nombre); // Assuming the API returns an object with a "nombre" field
    } catch (err: any) {
      console.error("Error fetching organigrama name:", err);
      setError(err.message || "Error fetching organigrama name");
    }
  };

  const fetchNodos = async (id: string) => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      console.error("No access token found");
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/nodos/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch nodos: ${response.statusText}`);
      }

      const data = await response.json();
      setNodos(data); // Assuming the API returns an array of nodes
      console.log(data)
    } catch (err: any) {
      console.error("Error fetching nodos:", err);
      setError(err.message || "Error fetching nodos");
    }
  };

  useEffect(() => {
    if (id_organigrama) {
      fetchOrganigramaName(id_organigrama);
      fetchNodos(id_organigrama);
    }
  }, [id_organigrama]);

  return (
    <div className="flex flex-col justify-center items-center bg-base-100">
      <div className="flex flex-row justify-center">
        <div className="mx-2">
          <ModalAgregar idOrganigrama={Number(id_organigrama)}/>
        </div>
        <div className="mx-2">
          <ModalActualizar  idOrganigrama={Number(id_organigrama)}/>
        </div>
        <div className="mx-2">
          <ModalEliminar idOrganigrama={Number(id_organigrama)}/>
        </div>
      </div>
      <div className="w-10/12 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold my-4 ">
          {organigramaName ? `Organigrama: ${organigramaName}` : "Cargando..."}
        </h1>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="w-3/4">
            <Organigrama data={nodos}></Organigrama>
          </div>
        )}
      </div>
    </div>
  );
}