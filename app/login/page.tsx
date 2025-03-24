import LoginForm from "@/app/components/LoginForm"
import Link from "next/link";
import { Form } from "react-hook-form"

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Iniciar Sesión</h1>
      <form className="w-full max-w-sm">
        <div className="mb-4 max-sm:px-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            placeholder="correo"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4 max-sm:px-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            placeholder="contraseña"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between max-sm:px-5">
          <button
            type="submit"
            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Iniciar Sesión
          </button>
        </div>
      </form>
      <div className="mt-4">
        <p className="text-gray-600 text-sm">
          ¿No tienes una cuenta?{' '}
          <Link className="text-blue-500 hover:text-blue-800" href="register">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
  /*
  return (
    <div className="flex  items-center justify-center min-h-screen py-2">
      <LoginForm />
    </div>
  )
  */
}
