export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Organigrama</h1>
      <div className="w-full max-w-sm">
        <div className="mb-4 max-sm:px-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Nombre de Usuario
          </label>
          <input
            type="text"
            id="username"
            placeholder="nombre de usuario"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
    </main>
  );
}