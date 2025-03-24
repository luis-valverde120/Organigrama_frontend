import { API_URL } from "./api";
import axios from "axios";

export async function fetchOrganigrama() {
  const response = await axios.get(`${API_URL}/organigramas`);
  return response.data;
}