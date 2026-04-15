import { api } from "../../lib/api";

export const fetchEmailPreference = async () => {
  const res = await api.get("/notification/emailPreference");
  return res.data;
};

export const changeEmailPreference = async () => {
  const res = await api.post("/notification/emailPreference");
  return res.data;
};
