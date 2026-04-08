import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { findAllSiswa, createDataSiswa, deleteDataSiswa } from "../services/dataUsers";
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
  const queryClient = useQueryClient();

  const { register, handleSubmit, trigger, formState: { errors }} = useForm();

  const { mutate: mutateCreateSiswa, isPending: isPendingCreateSiswa } = useMutation({
      mutationKey: ["create-siswa-account"],
      mutationFn: createDataSiswa,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get-all-siswa"] });

        Swal.fire({
          title: "Membuat Akun Siswa Berhasil 🎉",
          text: "Selamat Atas akun barunya. dan jangan lupa untuk siswa login ya.",
          icon: "success",
          confirmButtonText: "OK",
          background: "#1A202C",
          color: "#fff",
          confirmButtonColor: "#3182ce",
          backdrop: `rgba(0,0,0,0.6) left top no-repeat`,
        })
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

// delete siswa
export function useDeleteSiswa() {
  const queryClient = useQueryClient(); 

  const { mutate: mutateDeleteSiswa, isPending: isPendingDeleteSiswa } = useMutation({
    mutationKey: ["delete-siswa"],
    mutationFn: deleteDataSiswa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-siswa"] });

      Swal.fire({
        title: "Menghapus Data Siswa Berhasil 🎉",
        text: "Data telah dihapus dari sistem",
        icon: "success",
        confirmButtonText: "OK",
        background: "#1A202C",
        color: "#fff",
        confirmButtonColor: "#3182ce",
        backdrop: `rgba(0,0,0,0.6) left top no-repeat`,
      });
    },
    onError: (err) => {
      console.error("Error Login: ", err.message);

      Swal.fire({
        title: "Menghapus Data Siswa Gagal 😓",
        text: "Ada kesalahan server disaat menghapus data siswa",
        icon: "error",
        confirmButtonText: "OK",
        background: "#1A202C",
        color: "#fff",
        confirmButtonColor: "#ce3131",
        backdrop: `rgba(0,0,0,0.6) left top no-repeat`,
      });
    },
  });

  const confirmDeleteSiswa = (id, namaSiswa) => {
    Swal.fire({
      title: "Apakah kamu yakin?",
      text: `Data Siswa atas nama ${namaSiswa} akan dihapus secara permanen!`,
      icon: "warning",
      showCancelButton: true,
      background: "#1A202C",
      color: "#fff",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
      backdrop: `rgba(0,0,0,0.6) left top no-repeat`,
    }).then((result) => {
      // Jika user klik "Ya, Hapus!" maka eksekusi action hit ke API backend
      if (result.isConfirmed) {
        mutateDeleteSiswa(id);
      }
    });
  };

  return { confirmDeleteSiswa, isPendingDeleteSiswa };
}
//?? crud users role siswa end
