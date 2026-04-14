import { useState } from "react";

export default function useFilterGuru(data = []) {
  const [filters, setFilters] = useState({
    jabatan: "",
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

  const filteredData = data.filter((item) => {
    const matchJabatan =
      !filters.jabatan ||
      item?.jabatan
        ?.toLowerCase()
        .includes(filters.jabatan.toLowerCase());

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
      item?.nuptk?.toLowerCase().includes(filters.search.toLowerCase());

    return (
      matchJabatan &&
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