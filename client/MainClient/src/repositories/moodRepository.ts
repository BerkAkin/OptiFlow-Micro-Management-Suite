import { api } from "../lib/api";

export const recordMood = async (payload: any) => {
  const res = await api.post("/moods", payload);
  return res.data;
};

export const fetchMoods = async (filters: any, page: number, id?: number) => {
  const res = await api.get(`/moods`, { params: { ...filters, page } });
  return res.data;
};

export const fetchMoodChart = async () => {
  const res = await api.get(`/moods/latest`);
  return res.data;
};

export const fetchMyComments = async () => {
  const res = await api.get(`/comments/me`);
  return res.data;
};

export const CommentOnEmployees = async (payload: any) => {
  const res = await api.post("/comments", payload);
  return res.data;
};

export const fetchUsersMood = async () => {
  const res = await api.get("/comments/employees");
  return res.data;
};

export const fetchEmployeeComments = async (userId: number) => {
  const res = await api.get(`/comments`, {
    params: { userId: userId },
  });
  return res.data;
};

export const DeleteEmployeeComment = async (payload: any) => {
  const res = await api.delete(`/comments/${payload.commentId}`, {
    data: payload,
  });
  return res.data;
};
