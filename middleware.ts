import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { API_URL } from "./app/services/api";

// Middleware para verificar la autenticación y validar el token
export async function middleware(req: NextRequest) {
  // Verificar si la ruta es una de las protegidas
  const accessToken = req.cookies.get("access_token");

  // Si no existe el token, redirigir al login
  if (!accessToken) {
    const url = req.nextUrl.clone();
    url.pathname = "/login"; // Redirigir al login si no hay token
    return NextResponse.redirect(url);
  }

  try {
    // Hacer el fetch a la API para validar el token
    const res = await fetch(`${API_URL}/validate-token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken.value}`, // Enviar el token en el header Authorization
      },
    });

    // Si la respuesta no es exitosa, redirigir al login
    if (!res.ok) {
      const url = req.nextUrl.clone();
      url.pathname = "/login"; // Redirigir al login si la validación del token falla
      return NextResponse.redirect(url);
    }

  } catch (error) {
    console.error("Error al validar el token:", error);
    const url = req.nextUrl.clone();
    url.pathname = "/login"; // Redirigir al login en caso de error en la solicitud
    return NextResponse.redirect(url);
  }

  // Si pasa la verificación, continuar con la petición
  return NextResponse.next();
}

// Configuración del middleware para las rutas específicas
export const config = {
  matcher: [
    "/organigrama",  // Ruta principal
    "/organigrama/agregar",  // Ruta para agregar
    "/organigrama/:id_organigrama",  // Ruta dinámica
  ],
};
