import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { findAll, createDataJenisPelanggaran, updateDataJenisPelanggaran } from "../services/dataPelanggaranSiswa";
import Swal from "sweetalert2";
import { useState } from "react";
import { useForm } from "react-hook-form";

// ─── READ ALL ────────────────────────────────────────────────────────────────
export function useFindAll() {
  const { data: pelanggaranSiswa, isPending: isPendingPelanggaranSiswa } = useQuery({
    queryKey: ["pelanggaran-siswas"],
    queryFn: findAll,
  });

  return { pelanggaranSiswa, isPendingPelanggaranSiswa };
}

// ─── CREATE ──────────────────────────────────────────────────────────────────
export function useStore() {
  const queryClient = useQueryClient();

  const { mutate: createData, isPending: isPendingCreate } = useMutation({
    mutationFn: createDataJenisPelanggaran,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pelanggaran-siswas"] });
      Swal.fire({
        title: "Berhasil",
        text: "Data pelanggaran siswa berhasil ditambahkan",
        icon: "success",
        confirmButtonText: "OK",
      });
    },
    onError: (err) => {
      console.log("Error in hook store pelanggaran siswa: ", err.message);
      Swal.fire({
        title: "Error",
        text: "Gagal menambahkan data pelanggaran siswa",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  return { createData, isPendingCreate };
}

// ─── UPDATE ──────────────────────────────────────────────────────────────────
export function useUpdate() {
  const queryClient = useQueryClient();

  const { mutate: updateData, isPending: isPendingUpdate } = useMutation({
    mutationFn: updateDataJenisPelanggaran,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pelanggaran-siswas"] });
      Swal.fire({
        title: "Berhasil",
        text: "Data pelanggaran siswa berhasil diperbarui",
        icon: "success",
        confirmButtonText: "OK",
      });
    },
    onError: (err) => {
      console.log("Error in hook update pelanggaran siswa: ", err.message);
      Swal.fire({
        title: "Error",
        text: "Gagal memperbarui data pelanggaran siswa",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  return { updateData, isPendingUpdate };
}

// ─── FORM (dialog state + react-hook-form) ───────────────────────────────────
export function useFormPelanggaranSiswa() {
  const [step, setStep] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  // nis yang dipilih di Step 1
  const [selectedNis, setSelectedNis] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
    setValue,
  } = useForm();

  // ── buka dialog tambah data baru ──
  const handleBukaTambahData = () => {
    setEditId(null);
    setSelectedNis(null);
    setStep(1);
    reset({ nis: "", id_jenis_pelanggaran: "", keterangan: "" });
    setIsDialogOpen(true);
  };

  // ── buka dialog update ──
  const handleBukaUpdateData = (item) => {
    setEditId(item.id);
    // saat update, NIS sudah ada — langsung ke step 2
    setSelectedNis(item.siswa?.nis ?? null);
    setStep(2);
    reset({
      nis: item.siswa?.nis ?? "",
      id_jenis_pelanggaran: item.jenis_pelanggaran?.id ?? "",
      keterangan: item.keterangan ?? "",
    });
    setIsDialogOpen(true);
  };

  // ── validasi tiap step sebelum lanjut ──
  const handleNext = async () => {
    let fields = [];

    if (step === 1) {
      // step 1: siswa harus dipilih (nis)
      fields = ["nis"];
    }

    const isValid = await trigger(fields);
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  return {
    step,
    setStep,
    isDialogOpen,
    setIsDialogOpen,
    editId,
    setEditId,
    selectedNis,
    setSelectedNis,
    register,
    handleSubmit,
    errors,
    trigger,
    reset,
    setValue,
    handleNext,
    handleBukaTambahData,
    handleBukaUpdateData,
  };
}