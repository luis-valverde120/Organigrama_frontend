import ModalAgregar from "@/app/components/organigrama/ModalAgregar";
import ModalActualizar from "@/app/components/organigrama/ModalActualizar";
import ModalEliminar from "@/app/components/organigrama/ModalEliminar";

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center bg-base-100">
      <div className="flex flex-row justify-center">
        <div className="mx-2">
          <ModalAgregar />
        </div>
        <div className="mx-2">
          <ModalActualizar />
        </div>
        <div className="mx-2">
          <ModalEliminar />
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold">Organigrama</h1>
        <p className="text-gray-600">Aquí va el organigrama</p>
      </div>
    </div>
  );
}