'use client';
export default function ModalAgregar() {

  /* You can open the modal using document.getElementById('ID').showModal() method */
  return (
    <div>
      <button className="btn btn-primary" onClick={() => {
        const modal = document.getElementById('my_modal_3') as HTMLDialogElement | null;
        if (modal) modal.showModal();
      }}>agregar nodo</button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-4">Agregar nodo</h1>
            <form className="w-full max-w-sm">
              <div className="flex">
                <div className="mb-4 mr-2 max-sm:px-5">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    placeholder="nombre de nodo"
                    className="input"
                  />
                </div>

                <div className="mb-4 ml-2 max-sm:px-5">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="titulo">
                    Titulo
                  </label>
                  <input
                    type="text"
                    id="titulo"
                    placeholder="titulo"
                    className="input"
                  />
                </div>
              </div>

              <div className="mb-2 mr-2 max-sm:px-5">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-gray-700">Nodo Padre</legend>
                  <select defaultValue="Pick a browser" className="select w-full">
                    <option disabled={true}>Pick a nodo padre</option>
                    <option>Juan</option>
                    <option>Pedro</option>
                  </select>
                </fieldset>
              </div>

              <div className="mb-2 max-sm:px-5">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-gray-700">Tipo Cargo</legend>
                  <select defaultValue="Pick a browser" className="select w-full">
                    <option disabled={true}>Pick a cargo</option>
                    <option>Directo</option>
                    <option>Asesor</option>
                  </select>
                </fieldset>
              </div>

              <div className="mb-2 max-sm:px-5">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">
                  Color Texto
                </label>
                <input
                  type="color"
                  id="color_texto"
                  className="input w-full"
                />
              </div>

              <div className="mb-2 max-sm:px-5">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">
                  Color Fondo
                </label>
                <input
                  type="color"
                  id="color_fondo"
                  className="input w-full"
                />
              </div>

              <div className="mb-4 max-sm:px-5">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">
                  Color Borde
                </label>
                <input
                  type="color"
                  id="color_borde"
                  className="input w-full"
                />
              </div>

              <div className="flex items-center justify-between max-sm:px-5">
                <button
                  type="submit"
                  className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Agregar nodo
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}