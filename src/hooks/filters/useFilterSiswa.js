import { useState } from "react";

export default function useFilterSiswas(data = []) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ kelas: "", agama: "", jenis_kelamin: "", search: "" });
  const pageSize = 5;

  const handleChangeFilter = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // langsung filter tanpa useMemo
  const filteredData = data.filter((item) => {
    const matchKelas =
      !filters.kelas ||
      item?.kelas?.nama_kelas
        ?.toLowerCase()
        .includes(filters.kelas.toLowerCase());

    const matchAgama =
      !filters.agama ||
      item?.agama?.toLowerCase() === filters.agama.toLowerCase();

    const matchJenisKelamin =
      !filters.jenis_kelamin ||
      (filters.jenis_kelamin === "laki_laki"
        ? item?.jenis_kelamin === "L"
        : item?.jenis_kelamin === "P");

    const matchSearch =
      !filters.search ||
      item?.nama?.toLowerCase().includes(filters.search.toLowerCase()) ||
      item?.nis?.toLowerCase().includes(filters.search.toLowerCase());

    return matchKelas && matchAgama && matchJenisKelamin && matchSearch;
  });

  // pagination
  const totalItems = filteredData?.length || 0;
  const totalPages = Math.ceil(totalItems / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedData = filteredData?.slice(startIndex, endIndex);

  return {
    filters,
    handleChangeFilter,
    filteredData,

    // pagination
    totalItems,
    pageSize,
    totalPages,
    paginatedData,
    currentPage,
    setCurrentPage,
  };
}
