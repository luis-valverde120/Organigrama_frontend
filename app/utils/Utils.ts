export interface Nodo {
  id: number;
  nombre: string;
  titulo: string;
  tipo_cargo: "directo" | "asesoría";
  organigrama_id: number;
  padre_id?: number;
  color_bg: string;
  color_border: string;
  color_text: string;
}