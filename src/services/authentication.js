import { api } from "../lib/axios";

// login
export const loginApi = async(payload) => {
  const {data} = await api.post("/auth/login", payload);
  return data;
}
