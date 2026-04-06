import { api } from "../lib/axios";

//?? data siswa start
export const findAllSiswa = async() => {
  try {
    const response = await api.get("/siswa");
    return response.data.data;
  } catch(err) {
    console.log("Error in services find all siswa: ", err.message);
  }
}
//?? data siswa end