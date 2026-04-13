import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createKelas, findAllKelas, findByIdKelas, updateKelas } from "../services/dataKelas";
import Swal from "sweetalert2";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function useShowAllKelas() {
  const {data: getAllDataKelas, isPending: isPendingAllDataKelas} = useQuery({
    queryKey: ["get-all-kelas"],
    queryFn: findAllKelas
  });

  return {getAllDataKelas, isPendingAllDataKelas};
}

export function useShowByIdKelas(id) {
  const {data: getByIdDataKelas, isPending: isPendingGetByIdDataKelas} = useQuery({
    queryKey: ["get-by-id-kelas", id],
    queryFn: () => findByIdKelas(id),
    enabled: !!id
  });

  return {getByIdDataKelas, isPendingGetByIdDataKelas};
}

export function useCreate() {
  const queryClient = useQueryClient();

  const { mutate: createData, isPending: isPendingCreate } = useMutation({
    mutationKey: ['create-kelas'],
    mutationFn: createKelas,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-all-kelas'] });
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

  return {createData, isPendingCreate};
}

export function useUpdate() {
  const { mutate: updateData, isPending: isPendingUpdate } = useMutation({
    mutationFn: updateKelas,
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

export function useFormDataKelas() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const handleBukaTambahData = () => {
    setEditId(null);
    reset({ nama_kelas: "", guru: "" });
  };

  const handleBukaUpdateData = (dtk) => {
    setEditId(dtk.id);
    reset({ nama_kelas: dtk.nama_kelas, guru: dtk.guru?.nuptk });
    setIsDialogOpen(true);
  };

  return { isDialogOpen, setIsDialogOpen, editId, setEditId, register, handleSubmit, errors, reset, handleBukaTambahData, handleBukaUpdateData };
}