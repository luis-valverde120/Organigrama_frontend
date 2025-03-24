'use client';

export default function ModalEliminar() {
  return (
    <div>
      <button className="btn btn-error" onClick={() => {
        const modal = document.getElementById('my_modal_1') as HTMLDialogElement | null;
        if (modal) modal.showModal();
      }}>eliminar nodo</button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-4">Eliminar nodo</h1>
            <form className="w-full max-w-sm">
            

              <div className="mb-2 max-sm:px-5">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-gray-700">Nodo</legend>
                  <select defaultValue="Pick a browser" className="select w-full">
                    <option disabled={true}>Pick a nodo</option>
                    <option>Juan</option>
                    <option>Pedro</option>
                  </select>
                </fieldset>
              </div>


              <div className="flex items-center justify-between max-sm:px-5">
                <button
                  type="submit"
                  className="btn btn-error w-full"
                >
                  Eliminar Nodo
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  ); 
}