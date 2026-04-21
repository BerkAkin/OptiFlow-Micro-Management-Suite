import { api } from "../../lib/api";

export const login = async (payload: any) => {
  const res = await api.post("/auth/login", payload);
  return res.data;
};

export const resetPassword = async (payload: any) => {
  const res = await api.post("/auth/PasswordReset", payload);
  return res.data;
};

export const resetPasswordRequest = async (payload: any) => {
  console.log("latest", payload);
  const res = await api.post("/auth/PasswordResetRequester", payload);
  return res.data;
};
