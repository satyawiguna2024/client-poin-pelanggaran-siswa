import { api } from "../lib/axios";

//?? data siswa start
// get all siswa
export const findAllSiswa = async() => {
  try {
    const response = await api.get("/siswa");
    return response.data.data;
  } catch(err) {
    console.log("Error in services find all siswa: ", err.message);
    throw err;
  }
}

// create siswa
export const createDataSiswa = async(data) => {
  try {
    const response = await api.post("/auth/register-siswa", data);
    return response.data;
  } catch(err) {
    console.log("Error in services create data siswa: ", err.message);
    throw err;
  }
}

// update siswa
export const updateDataSiswa = async(id, data) => {
  try {
    const response = await api.put(`/siswa/${id}`, data);
    return response.data;
  } catch(err) {
    console.log("Error in services update data siswa: ", err.message);
    throw err;
  }
}

// delete siswa
export const deleteDataSiswa = async(id) => {
  try {
    const response = await api.delete(`/siswa/${id}`);
    return response.data;
  } catch (err) {
    console.log("Error in services delete data siswa: ", err.message);
    throw err;
  }
}
//?? data siswa end

//?? data guru start

// create data guru
export const createDataGuru = async(data) => {
  try {
    const response = await api.post("/auth/register-guru", data);
    return response.data;
  } catch (err) {
    console.log("Error in services create data guru: ", err.message);
    throw err;
  }
}

// get all guru
export const findAllGuru = async() => {
  try {
    const response = await api.get("/guru");
    return response.data.data;
  } catch (err) {
    console.log("Error in services find all guru: ", err.message);
    throw err;
  }
}

// update guru
export const updateDataGuru = async(id, data) => {
  try {
    const response = await api.put(`/guru/${id}`, data);
    return response.data;
  } catch (err) {
    console.log("Error in services update data guru: ", err.message);
    throw err;
  }
}

// delete guru
export const deleteDataGuru = async(id) => {
  try {
    const response = await api.delete(`/guru/${id}`);
    return response.data;
  } catch (err) {
    console.log("Error in services delete data guru: ", err.message);
    throw err;
  }
}
//?? data guru end
