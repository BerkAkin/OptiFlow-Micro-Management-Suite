import { api } from "../lib/api";

export const fetchEmailPreference = async () => {
  const res = await api.get("/preferences");
  return res.data;
};

export const changeEmailPreference = async () => {
  const res = await api.patch("/preferences");
  return res.data;
};

export const changeProfilePicture = async (formData: FormData) => {
  const res = await api.post("/users/me/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const getProfilePicture = async (fileName: string) => {
  const res = await api.get(`/users/me/avatar/${fileName}`, {
    responseType: "blob",
  });
  return res.data;
};

export const deactivateAccount = async (formData: any) => {
  const res = await api.patch(`/users/me/accountDeactivate`, formData);
  return res.data;
};
