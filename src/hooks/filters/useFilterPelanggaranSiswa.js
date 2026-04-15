import { useState } from "react";

export default function useFilterPelanggaranSiswa(data = []) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    kelas: "",
    jenis_pelanggaran: "",
    tanggal: "",
    search: "",
  });
  const pageSize = 5;

  const handleChangeFilter = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // FILTER
  const filteredData = data.filter((item) => {
    const matchKelas =
      !filters.kelas ||
      item?.siswa?.kelas?.nama_kelas
        ?.toLowerCase()
        .includes(filters.kelas.toLowerCase());

    const matchJenis =
      !filters.jenis_pelanggaran ||
      item?.jenis_pelanggaran?.nama_pelanggaran
        ?.toLowerCase()
        .includes(filters.jenis_pelanggaran.toLowerCase());

    const matchSearch =
      !filters.search ||
      item?.siswa?.nama?.toLowerCase().includes(filters.search.toLowerCase()) ||
      item?.siswa?.nis?.toLowerCase().includes(filters.search.toLowerCase());

    return matchKelas && matchJenis && matchSearch;
  });

  // SORT
  let finalData = [...filteredData];

  if (filters.tanggal === "terbaru") {
    finalData.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
  } else if (filters.tanggal === "terlama") {
    finalData.sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));
  }

  // PAGINATION
  const totalItems = finalData.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedData = finalData.slice(startIndex, endIndex);

  return {
    filters,
    handleChangeFilter,

    // data
    filteredData: finalData,
    paginatedData,

    // pagination
    totalItems,
    pageSize,
    totalPages,
    currentPage,
    setCurrentPage,
  };
}
