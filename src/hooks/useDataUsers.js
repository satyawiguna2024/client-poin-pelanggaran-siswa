import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { findAllSiswa, createDataSiswa } from "../services/dataUsers";
import Swal from "sweetalert2";

//?? crud users role siswa start
// show all
export function useFindAllSiswa() {
  const { data: findAllDataSiswa, isPending: isPendingFindAllSiswa } = useQuery(
    {
      queryKey: ["get-all-siswa"],
      queryFn: findAllSiswa,
    },
  );

  return { findAllDataSiswa, isPendingFindAllSiswa };
}

// create
export function useCreateSiswa() {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();

  const { mutate: mutateCreateSiswa, isPending: isPendingCreateSiswa } =
    useMutation({
      mutationKey: ["create-siswa-account"],
      mutationFn: createDataSiswa,
      onSuccess: () => {
        Swal.fire({
          title: "Membuat Akun Siswa Berhasil 🎉",
          text: "Selamat Atas akun barunya. dan jangan lupa untuk siswa login ya.",
          icon: "success",
          confirmButtonText: "OK",
          background: "#1A202C",
          color: "#fff",
          confirmButtonColor: "#3182ce",
          backdrop: `rgba(0,0,0,0.6) left top no-repeat`,
        }).then((res) => {
          if (res.isConfirmed) window.location.reload();
        });
      },
      onError: (err) => {
        console.error("Error Login: ", err.message);

        Swal.fire({
          title: "Buat Akun Siswa Gagal😓",
          text: "Maaf pembuatan akun siswa gagal nih.. coba di periksa kembali field nya semua dengan benar dan sudah terisi semua!",
          icon: "error",
          confirmButtonText: "OK",
          background: "#1A202C",
          color: "#fff",
          confirmButtonColor: "#ce3131",
          backdrop: `rgba(0,0,0,0.6) left top no-repeat`,
        });
      },
    });

  const onSubmit = (data) => {
    mutateCreateSiswa(data);
  };

  return {register, handleSubmit, onSubmit, errors, trigger, isPendingCreateSiswa};
}
//?? crud users role siswa end
