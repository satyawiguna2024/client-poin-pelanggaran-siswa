import axios from "axios";

// membuat api untuk contoh: api.post (tujuannya biar tidak panggil axios lagi.. biar tidak panggil seperti ini axios.post)
export const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptor kalau nanti pakai token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.log("Token Tidak Ditemukan");
  }
  return config;
});