import { api } from "../lib/api";

export const login = async (payload: any) => {
  const res = await api.post("/auth/login", payload);
  return res.data;
};

export const resetPassword = async (payload: any) => {
  const res = await api.post("/auth/password-reset", payload);
  return res.data;
};

export const resetPasswordRequest = async (payload: any) => {
  const res = await api.post("/auth/password-reset-request", payload);
  return res.data;
};

export const changePassword = async (payload: any) => {
  const res = await api.post("/auth/me/password", payload);
  return res.data;
};
