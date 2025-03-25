import { useState } from "react";
import { useRouter } from "next/navigation";

// const url
import { API_URL } from "@/app/services/api";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error("Credenciales incorrectas");

      const data = await res.json();
      document.cookie = `access_token=${data.access_token}; path=/; secure; HttpOnly`;
      localStorage.setItem("refresh_token", data.refresh_token);

      router.push("/dashboard"); // Redirigir al usuario
    } catch (error) {
      console.error("Error de login", error);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};
