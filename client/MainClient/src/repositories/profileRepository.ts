import { api } from "../lib/api";

export const fetchEmailPreference = async () => {
  const res = await api.get("/notification/emailPreference");
  return res.data;
};

export const changeEmailPreference = async () => {
  const res = await api.post("/notification/emailPreference");
  return res.data;
};

export const changeProfilePicture = async (formData: FormData) => {
  const res = await api.post("/auth/upload-avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const getProfilePicture = async (fileName: string) => {
  const res = await api.get(`/auth/profile-picture/${fileName}`, {
    responseType: "blob",
  });
  return res.data;
};
