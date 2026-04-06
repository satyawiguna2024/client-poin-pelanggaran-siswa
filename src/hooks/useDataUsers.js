import { useQuery } from "@tanstack/react-query";
import { findAllSiswa } from "../services/dataUsers";
import Swal from "sweetalert2";

//!! crud users role siswa start
export function useFindAllSiswa() {
  const {data: findAllDataSiswa, isPending: isPendingFindAllSiswa} = useQuery({
    queryKey: ['get-all-siswa'],
    queryFn: findAllSiswa,
  });
  
  return {findAllDataSiswa, isPendingFindAllSiswa}
}
//!! crud users role siswa end