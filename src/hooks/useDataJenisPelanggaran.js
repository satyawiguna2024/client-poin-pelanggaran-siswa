import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { findAll, createDataJenisPelanggaran, updateDataJenisPelanggaran, deleteDataJenisPelanggaran } from "../services/dataJenisPelanggaran";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useState } from "react";

export function useFindAll() {
  const { data: jenisPelanggaran, isPending: isPendingJenisPelanggaran } = useQuery({
    queryKey: ['get-all-jenis-pelanggaran'],
    queryFn: findAll
  });

  return { jenisPelanggaran, isPendingJenisPelanggaran };
}

export function useStore() {
  const queryClient = useQueryClient();

  const { mutate: createData, isPending: isPendingCreate } = useMutation({
    mutationFn: createDataJenisPelanggaran,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-all-jenis-pelanggaran'] });
      Swal.fire({
        title: "Success",
        text: "Data berhasil ditambahkan",
        icon: "success",
        confirmButtonText: "OK"
      });
    },
    onError: (err) => {
      console.log("Error in hook store jenis pelanggaran: ", err.message);

      Swal.fire({
        title: "Error",
        text: "Gagal menambahkan data",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  });

  return { createData, isPendingCreate };
}

export function useUpdate() {

  const { mutate: updateData, isPending: isPendingUpdate } = useMutation({
    mutationFn: updateDataJenisPelanggaran,
    onSuccess: () => {
      Swal.fire({
        title: "Success",
        text: "Data berhasil diperbarui",
        icon: "success",
        confirmButtonText: "OK"
      }).then(() => {
        window.location.reload();
      });
    },
    onError: (err) => {
      console.log("Error in hook update jenis pelanggaran: ", err.message);

      Swal.fire({
        title: "Error",
        text: "Gagal memperbarui data",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  });

  return { updateData, isPendingUpdate };
}

export function useDelete() {
  const queryClient = useQueryClient();

  const { mutate: deleteData, isPending: isPendingDelete } = useMutation({
    mutationFn: deleteDataJenisPelanggaran,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-all-jenis-pelanggaran'] });
      Swal.fire({
        title: "Success",
        text: "Data berhasil dihapus",
        icon: "success",
        confirmButtonText: "OK"
      });
    },
    onError: (err) => {
      console.log("Error in hook delete jenis pelanggaran: ", err.message);

      Swal.fire({
        title: "Error",
        text: "Gagal menghapus data",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  });

  const confirmDeleteData = (id, nama) => {
    Swal.fire({
      title: `Hapus ${nama}?`,
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteData(id);
      }
    });
  };

  return { deleteData, isPendingDelete, confirmDeleteData };
}

// form
export function useDjpFrom() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handleBukaTambahData = () => {
    setEditId(null);
    reset({ nama_pelanggaran: "", poin: "" });
  };

  const handleBukaUpdateData = (djp) => {
    setEditId(djp.id);
    reset({ nama_pelanggaran: djp.nama_pelanggaran, poin: djp.poin });
    setIsDialogOpen(true);
  };

  return { isDialogOpen, setIsDialogOpen, editId, setEditId, register, handleSubmit, errors, reset, handleBukaTambahData, handleBukaUpdateData };
}