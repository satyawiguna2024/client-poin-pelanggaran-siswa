import { api } from "../lib/axios";

export const getProfileSiswaApi = async () => {
  // const token = localStorage.getItem("jwtToken");
  // console.log("profile token: ", token);

  const response = await api.get("/siswa/profile");

  return response.data;
};
