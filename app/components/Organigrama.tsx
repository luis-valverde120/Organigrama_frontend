
export default function Organigrama({
    id_organigrama, 
    nombre_organigrama,
    nodos, 
    edges
  }: {
    id_organigrama: string,
    nombre_organigrama: string,
    nodos: Array<{ id: string, label: string }>,
    edges: Array<{ from: string, to: string }>
  }) {

  
  return (
    <div className="flex flex-col justify-center items-center bg-base-100">
      <div>
        <h1 className="text-2xl font-bold">{nombre_organigrama}</h1>
        <p className="text-gray-600">Aquí va el organigrama</p>
      </div>
    </div>
  );
}