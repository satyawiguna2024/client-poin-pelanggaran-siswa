import { useState } from "react";

export default function useFilterSiswas(data = []) {
  const [filters, setFilters] = useState({
    kelas: "",
    agama: "",
    jenis_kelamin: "",
    search: "",
  });

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

    return (
      matchKelas &&
      matchAgama &&
      matchJenisKelamin &&
      matchSearch
    );
  });

  return {
    filters,
    handleChangeFilter,
    filteredData,
  };
}