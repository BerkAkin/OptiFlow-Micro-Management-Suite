import { api } from "../../lib/api";

export const login = async (payload: any) => {
  const res = await api.post("/auth/login", payload);
  return res.data;
};
