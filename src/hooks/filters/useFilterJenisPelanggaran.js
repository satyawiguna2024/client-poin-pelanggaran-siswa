import { useState } from "react";

export default function useFilterJenisPelanggaran(data = []) {
  const [filters, setFilters] = useState({
    poin: "",      // terbesar / terkecil
    tanggal: "",   // terbaru / terlama
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
      item?.nama_pelanggaran
        ?.toLowerCase()
        .includes(filters.search.toLowerCase())
    );
  }

  // 🔢 SORT POIN
  if (filters.poin === "terbesar") {
    filteredData.sort((a, b) => b.poin - a.poin);
  } else if (filters.poin === "terkecil") {
    filteredData.sort((a, b) => a.poin - b.poin);
  }

  // 📅 SORT TANGGAL
  if (filters.tanggal === "terbaru") {
    filteredData.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  } else if (filters.tanggal === "terlama") {
    filteredData.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
  }

  return {
    filters,
    handleChangeFilter,
    filteredData,
  };
}