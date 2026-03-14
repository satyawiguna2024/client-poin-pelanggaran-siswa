import { api } from "../lib/axios";

export const getProfileSiswaApi = async () => {
  try {
    const response = await api.get("/siswa/profile");
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Jika 404, berarti tidak ada profile, return null
      return null;
    }
    // Untuk error lain, throw kembali
    throw error;
  }
};
