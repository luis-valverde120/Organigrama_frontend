'use client';
import Sidebar from "@/app/components/Sidebar";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [refresh, setRefresh] = useState(false);
  const pathname = usePathname(); // Detecta cambios en la ruta

  useEffect(() => {
    setRefresh((prev) => !prev); // Cambia el estado para forzar actualización
  }, [pathname]); 
  
  return (
    <div className="flex flex-row items-center justify-center min-h-screen py-2">
      <div className="w-full flex-none md:w-64">
        <Sidebar refresh={refresh}/>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}