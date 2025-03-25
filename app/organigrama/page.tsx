'use client';
import { useEffect, useState } from "react";
import { Organigrama } from "@/app/utils/Utils";
import { useRouter } from "next/navigation";
import { API_URL } from "../services/api";

export default function Page() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshSidebar, setRefreshSidebar] = useState(false); // State to trigger sidebar refresh
  const [organigramas, setOrganigramas] = useState<Organigrama[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchOrganigramas = async () => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/organigramas`, {
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

  const fetchDeleteOrganigrama = async (id: number) => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      console.error("No access token found");
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/organigrama/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete organigrama: ${response.statusText}`);
      }

      // Refresh the organigramas list
      fetchOrganigramas();
      setRefreshSidebar(!refreshSidebar); // Trigger sidebar refresh;
      window.location.reload()
    } catch (err: any) {
      console.error("Error deleting organigrama:", err);
      setError(err.message || "Error deleting organigrama");
    }
  };

  useEffect(() => {
    fetchOrganigramas();
  }, []);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("access_token");
    setAccessToken(storedAccessToken);

    if (!storedAccessToken) {
      router.push("/login");
    }
  }, []);

  return (
    <main className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold">Organigramas</h1>
      <div className="w-2/3 mt-10">
        <ul className="list bg-base-200 w-full rounded-box shadow-md">
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Lista de organigramas</li>
          {error ? (
            <li className="p-4 pb-2 text-red-500">{error}</li>
          ) : (
            organigramas.map((organigrama, index) => (
              <li key={organigrama.id} className="list-row">
                <div className="text-4xl font-thin opacity-30 tabular-nums">{index + 1}</div>
                <div>
                  <div>{organigrama.nombre}</div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {organigrama.descripcion || "No descripción"}
                  </div>
                </div>
                <button
                  className="btn btn-square btn-ghost"
                  onClick={() => router.push(`/organigrama/${organigrama.id}`)}
                >
                  <svg
                    className="size-[1.2em]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                      <path d="M6 3L20 12 6 21 6 3z"></path>
                    </g>
                  </svg>
                </button>
                <form onSubmit={(e) => { 
                  e.preventDefault(); 
                  fetchDeleteOrganigrama(organigrama.id); 
                }}>
                  <button
                    className="btn btn-square btn-error"
                    type="submit"
                  >
                    <svg
                      className="fill-gray-200"
                      xmlns="http://www.w3.org/2000/svg"
                      height="14"
                      width="12.5"
                      viewBox="0 0 448 512"
                    >
                      <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                  </button>
                </form>

              </li>
            ))
          )}
        </ul>
      </div>
    </main>
  );
}