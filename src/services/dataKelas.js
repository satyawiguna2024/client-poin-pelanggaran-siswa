import { api } from "../lib/axios";

export const findAllKelas = async() => {
  try {
    const response = await api.get("/kelas");
    return response.data.data;
  } catch (err) {
    console.log("Error in service find all kelas: ", err.message);
  }
}

export const findByIdKelas = async(id) => {
  try {
    const response = await api.get(`/kelas/${id}`);
    return response.data.data;
  } catch (err) {
    console.log("Error in service find by id kelas: ", err.message);
    throw new Error(err.message);
  }
}

export const createKelas = async(data) => {
  try {
    const response = await api.post("/kelas", data);
    return response.data;
  } catch (err) {
    console.log("Error in create kelas: ", err.message);
    throw new Error(err.message);
  }
}

export const updateKelas = async({id, data}) => {
  try {
    const response = await api.put(`/kelas/${id}`, data);
    return response.data;
  } catch (err) {
    console.log("Error in service update jenis pelanggaran: ", err.message);
    throw err;
  }
}