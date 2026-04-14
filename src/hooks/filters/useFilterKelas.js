import { useState } from "react";

export default function useFilterKelas(data = []) {
  const [filters, setFilters] = useState({
    tanggal: "", // terbaru / terlama
    jumlah_siswa: "", // terbanyak / terendah
    search: "",
  });

  const handleChangeFilter = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  let filteredData = [...data];

  // 🔍 SEARCH
  if (filters.search) {
    filteredData = filteredData.filter((item) =>
      item?.nama_kelas?.toLowerCase().includes(filters.search.toLowerCase()),
    );
  }

  const sortedData = [...filteredData].sort((a, b) => {
    // PRIORITAS 1: tanggal
    if (filters.tanggal) {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);

      if (dateA !== dateB) {
        return filters.tanggal === "terbaru" ? dateB - dateA : dateA - dateB;
      }
    }

    // PRIORITAS 2: jumlah siswa
    if (filters.jumlah_siswa) {
      return filters.jumlah_siswa === "terbanyak"
        ? b.jumlah_siswa - a.jumlah_siswa
        : a.jumlah_siswa - b.jumlah_siswa;
    }

    return 0;
  });

  // 📅 SORT BY TANGGAL
  if (filters.tanggal === "terbaru") {
    filteredData.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at),
    );
  } else if (filters.tanggal === "terlama") {
    filteredData.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at),
    );
  }

  return {
    filters,
    handleChangeFilter,
    filteredData: sortedData,
  };
}
