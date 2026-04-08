import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { findAllSiswa, createDataSiswa, deleteDataSiswa, updateDataSiswa } from "../services/dataUsers";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";

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
      });
    },
    onError: (err) => {
      console.log("Error in create siswa: ", err.message);

      Swal.fire({
        title: "Buat Akun Siswa Gagal😓",
        text: "Maaf pembuatan akun siswa gagal nih.. coba di periksa kembali!",
        icon: "error",
      });
    },
  });
  return { mutateCreateSiswa, isPendingCreateSiswa };
}

// update
export function useUpdateSiswa() {
  const { mutate: mutateUpdateSiswa, isPending: isPendingUpdateSiswa } = useMutation({
    mutationKey: ["update-siswa-account"],
    mutationFn: (payload) => updateDataSiswa(payload.id, payload.data),
    onSuccess: () => {
      Swal.fire({
        title: "Update Data Siswa Berhasil 🎉",
        text: "Data Siswa berhasil diperbaharui.",
        icon: "success",
        confirmButtonText: "OK",
        background: "#1A202C", color: "#fff", confirmButtonColor: "#3182ce",
      }).then((response) => {
        if (response.isConfirmed) window.location.reload();
      })
    },
    onError: (err) => {
      console.log("Error in update siswa: ", err.message);
      Swal.fire({
        title: "Update Data Siswa Gagal😓",
        text: "Maaf update gagal, silakan coba lagi!",
        icon: "error",
      });
    },
  });
  return { mutateUpdateSiswa, isPendingUpdateSiswa };
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

// logic yang lainnya dari siswa
export default function useSiswaForms() {
  const [step, setStep] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const { register, handleSubmit, formState: { errors }, trigger, reset } = useForm();

  // trigger field required sebelum next step
  const handleNext = async () => {
    let fields = [];

    if (step === 1) {
      fields = ["username", "email", "password"];
    }

    if (step === 2) {
      fields = [ "nis", "nama", "tanggal_lahir", "agama", "jenis_kelamin", "alamat", "id_kelas", "telepon"];
    }

    if (step === 3) {
      fields = [ "nama_ayah", "nama_ibu", "pekerjaan_ayah", "pekerjaan_ibu", "telepon_ayah", "telepon_ibu" ];
    }

    const isValid = await trigger(fields);

    if (isValid) {
      setStep(step + 1);
    }
  };

  const handleBukaTambahData = () => {
    setEditId(null);
    reset({});
    setStep(1);
    setIsDialogOpen(true);
  };

  const handleBukaUpdateData = (ds) => {
    // Rubah mode jadi update dengan menanamkan ID_USERS
    setEditId(ds?.user_account?.id);

    // Inject / suntikan data lamanya supaya lansung ter-fill otomatis
    reset({
      username: ds?.user_account?.username,
      email: ds?.user_account?.email,
      nis: ds?.nis,
      nama: ds?.nama,
      tanggal_lahir: ds?.tanggal_lahir,
      agama: ds?.agama,
      jenis_kelamin: ds?.jenis_kelamin,
      id_kelas: ds?.kelas?.id,
      alamat: ds?.alamat,
      telepon: ds?.telepon,
      nama_ayah: ds?.data_ortu?.nama_ayah,
      nama_ibu: ds?.data_ortu?.nama_ibu,
      pekerjaan_ayah: ds?.data_ortu?.pekerjaan_ayah,
      pekerjaan_ibu: ds?.data_ortu?.pekerjaan_ibu,
      telepon_ayah: ds?.data_ortu?.telepon_ayah,
      telepon_ibu: ds?.data_ortu?.telepon_ibu,
    });
    // Reset halaman step lalu Buka dialog
    setStep(2);
    setIsDialogOpen(true);
  };

  return {
    step,
    setStep,
    isDialogOpen,
    setIsDialogOpen,
    editId,
    setEditId,
    register,
    handleSubmit,
    errors,
    trigger,
    reset,
    handleNext,
    handleBukaTambahData,
    handleBukaUpdateData,
  };
}
//?? crud users role siswa end
