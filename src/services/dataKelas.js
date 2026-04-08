import { api } from "../lib/axios";

export const findAllKelas = async() => {
  try {
    const response = await api.get("/kelas");
    return response.data.data;
  } catch (err) {
    console.log("Error in service find all kelas: ", err.message);
  }
}