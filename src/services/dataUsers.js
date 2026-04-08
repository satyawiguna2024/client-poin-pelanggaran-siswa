import { api } from "../lib/axios";

//?? data siswa start
// get all siswa
export const findAllSiswa = async() => {
  try {
    const response = await api.get("/siswa");
    return response.data.data;
  } catch(err) {
    console.log("Error in services find all siswa: ", err.message);
  }
}

// create siswa
export const createDataSiswa = async(data) => {
  try {
    const response = await api.post("/auth/register-siswa", data);
    return response.data;
  } catch(err) {
    console.log("Error in services create data siswa: ", err.message);
  }
}

// update siswa
export const updateDataSiswa = async(id, data) => {
  try {
    const response = await api.put(`/siswa/${id}`, data);
    return response.data;
  } catch(err) {
    console.log("Error in services update data siswa: ", err.message);
  }
}

// delete siswa
export const deleteDataSiswa = async(id) => {
  try {
    const response = await api.delete(`/siswa/${id}`);
    return response.data;
  } catch (err) {
    console.log("Error in services delete data siswa: ", err.message);
  }
}
//?? data siswa end