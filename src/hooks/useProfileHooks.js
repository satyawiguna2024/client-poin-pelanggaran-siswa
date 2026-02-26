import { useQuery } from "@tanstack/react-query";
import { getProfileSiswaApi } from "../services/profile";


export function useProfileHook() {
  const {data: getProfile, isPending, isError} = useQuery({
    queryKey: ['profile-siswa'],
    queryFn: getProfileSiswaApi,
    staleTime: 1000 * 60 * 5, // cache 5 menit
  });

  return {getProfile, isPending, isError};
}