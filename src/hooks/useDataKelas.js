import { useQuery } from "@tanstack/react-query";
import { findAllKelas } from "../services/dataKelas";

export function useShowAllKelas() {
  const {data: getAllDataKelas, isPending: isPendingAllDataKelas} = useQuery({
    queryKey: ["get-all-kelas"],
    queryFn: findAllKelas
  });

  return {getAllDataKelas, isPendingAllDataKelas};
}