import { useQuery } from "@tanstack/react-query";
import { getProfileSiswaApi } from "../services/profile";


export function useProfileHook() {
  const {data: getProfileSiswa, isPending, isError} = useQuery({
    queryKey: ['profile-siswa'],
    queryFn: getProfileSiswaApi,
    retry: false, // Jangan refresh halaman otomatis
  });

  return {getProfileSiswa, isPending, isError};
}