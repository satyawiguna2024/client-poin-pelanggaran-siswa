import { api } from "../lib/axios";

// login
export const loginApi = async(payload) => {
  const {data} = await api.post("/auth/login", payload);
  return data;
}

// register
export const registerApi = async(payload) => {
  const {data} = await api.post("/auth/register", payload);
  return data;
}
