import { api } from "../lib/axios";

// find all data
export const findAll = async () => {
  try {
    const response = await api.get("/jenis-pelanggaran");
    return response.data.data;
  } catch (err) {
    console.log("Error in service find all jenis pelanggaran: ", err.message);
    throw err;
  }
}

// create data
export const createDataJenisPelanggaran = async (data) => {
  try {
    const response = await api.post("/jenis-pelanggaran", data);
    return response.data;
  } catch (err) {
    console.log("Error in service create jenis pelanggaran: ", err.message);
    throw err;
  }
}

// update data
export const updateDataJenisPelanggaran = async ({ id, data }) => {
  try {
    const response = await api.put(`/jenis-pelanggaran/${id}`, data);
    return response.data;
  } catch (err) {
    console.log("Error in service update jenis pelanggaran: ", err.message);
    throw err;
  }
}

// delete
export const deleteDataJenisPelanggaran = async (id) => {
  try {
    const response = await api.delete(`/jenis-pelanggaran/${id}`);
    return response.data;
  } catch (err) {
    console.log("Error in service delete jenis pelanggaran: ", err.message);
    throw err;
  }
}