'use client';
import Link from "next/link";
import Stat from "@/app/components/Stat";
import { useEffect, useState } from "react";

interface Organigrama {
  id: number;
  nombre: string;
}

export default function Sidebar({ refresh = false }: { refresh?: boolean }) {
  const [organigramas, setOrganigramas] = useState<Organigrama[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchOrganigramas = async () => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/organigramas", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch organigramas");
      }

      const data = await response.json();
      setOrganigramas(data); // Assuming the API returns an array of organigramas
    } catch (err: any) {
      console.error("Error fetching organigramas:", err);
      setError(err.message || "Error fetching organigramas");
    }
  };

  useEffect(() => {
    fetchOrganigramas();
  }, [refresh]); // Re-fetch organigramas when `refresh` changes

  return (
    <div className="w-64 fixed left-0 top-0 bottom-0 bg-base-200 text-white p-4 flex flex-col">
      <div className="flex flex-col justify-center items-center mb-2">
        <h2 className="text-2xl font-bold">Organigrama</h2>
        <div className="w-full flex flex-col justify-center items-left">
          <Stat title="username" value="nombre" />
        </div>
      </div>
      <nav className="flex-1">
        <ul className="menu bg-base-200 rounded-box w-56">
          <li>
            <details open>
              <summary>Organigramas</summary>
              <ul>
                {error ? (
                  <li className="text-red-500">{error}</li>
                ) : (
                  organigramas.map((organigrama) => (
                    <li key={organigrama.id}>
                      <Link href={`/organigrama/${organigrama.id}`}>
                        {organigrama.nombre}
                      </Link>
                    </li>
                  ))
                )}
                <li>
                  <Link href="/organigrama/agregar" className="text-blue-500">
                    + Agregar Organigrama
                  </Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </nav>
      <footer className="mt-6">
        <p className="text-sm text-gray-400">© 2023 Organigrama</p>
      </footer>
    </div>
  );
}