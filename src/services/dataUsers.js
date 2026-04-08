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
//?? data siswa end