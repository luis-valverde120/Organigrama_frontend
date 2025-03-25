'use client';
import { useEffect, useState } from "react";

export default function Page() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    // Access localStorage only on the client side
    const storedAccessToken = localStorage.getItem("access_token");
    const storedRefreshToken = localStorage.getItem("refresh_token");

    setAccessToken(storedAccessToken);
    setRefreshToken(storedRefreshToken);

    if (!storedAccessToken) {
      // Redirect to login if no access token is found
      window.location.href = "/login";
    }
  }, []);

  console.log("Access Token:", accessToken);
  console.log("Refresh Token:", refreshToken);

  return (
    <main className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold">Organigrama</h1>
    </main>
  );
}