import { useQuery } from "@tanstack/react-query";
import { fetchOrganigrama } from "@/app/services/organigramaService";

export function useOrganigrama() {
  return useQuery({ queryKey: ["organigrama"], queryFn: fetchOrganigrama });
}