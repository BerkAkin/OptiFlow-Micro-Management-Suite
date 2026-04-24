import { api } from "../lib/api";

export const recordMood = async (payload: any) => {
  const res = await api.post("/Mood", payload);
  return res.data;
};

export const fetchMoods = async (filters: any, page: number, id?: number) => {
  const res = await api.get(`/Mood`, { params: { ...filters, page } });
  return res.data;
};

export const fetchMoodChart = async () => {
  const res = await api.get(`/Mood/Previous`);
  return res.data;
};

export const fetchMyComments = async () => {
  const res = await api.get(`/Mood/MyComments`);
  return res.data;
};

export const CommentOnEmployees = async (payload: any) => {
  const res = await api.post("/Mood/Comment", payload);
  return res.data;
};

export const fetchUsersMood = async () => {
  const res = await api.get("/Mood/Users");
  console.log("users repo data", res.data);
  return res.data;
};

export const fetchEmployeeComments = async (userId: number) => {
  const res = await api.get(`/Mood/AllComments`, {
    params: { userId: userId },
  });
  return res.data;
};

export const DeleteEmployeeComment = async (payload: any) => {
  const res = await api.delete(`/Mood/Comment`, {
    data: payload,
  });
  return res.data;
};
