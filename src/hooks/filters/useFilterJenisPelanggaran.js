import { useState } from "react";

export default function useFilterJenisPelanggaran(data = []) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ poin: "", tanggal: "", search: "" });
  const pageSize = 5;

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