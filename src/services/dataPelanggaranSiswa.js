import { api } from "../lib/axios";

// find all data
export const findAll = async () => {
  try {
    const response = await api.get("/pelanggaran-siswa");
    return response.data;
  } catch (err) {
    console.log("Error in service find all pelanggaran siswa: ", err.message);
    throw err;
  }
}

// create data
export const createDataJenisPelanggaran = async (data) => {
  try {
    const response = await api.post("/pelanggaran-siswa", data);
    return response.data;
  } catch (err) {
    console.log("Error in service create pelanggaran siswa: ", err.message);
    throw err;
  }
}

// update data
export const updateDataJenisPelanggaran = async ({ id, data }) => {
  try {
    const response = await api.put(`/pelanggaran-siswa/${id}`, data);
    return response.data;
  } catch (err) {
    console.log("Error in service update pelanggaran siswa: ", err.message);
    throw err;
  }
}