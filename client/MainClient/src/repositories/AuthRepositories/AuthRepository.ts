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
  const res = await api.post("/auth/PasswordResetRequester", payload);
  return res.data;
};

export const changePassword = async (payload: any) => {
  const res = await api.post("/auth/passwordUpdate", payload);
  return res.data;
};
