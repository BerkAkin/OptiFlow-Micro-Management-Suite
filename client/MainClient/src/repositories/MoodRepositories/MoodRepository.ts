import { api } from "../../lib/api";

const tempPreviousMoods = [
  { day: "Monday", value: 1 },
  { day: "Tuesday", value: 5 },
  { day: "Wednesday", value: 3 },
  { day: "Thursday", value: 4 },
  { day: "Friday", value: 2 },
];

export const recordMood = async (payload: any) => {
  const res = await api.post("/Mood", payload);
  return res.data;
};

export const fetchMoods = async (filters: any, page: number, id?: number) => {
  const res = await api.get(`/Mood`, { params: { ...filters, page } });
  return res.data;
};

export const fetchMoodChart = async (id: number) => {
  /*  const res = await api.get(`api/mood/${id}`);
  return res.data; */
  return tempPreviousMoods;
};

export const fetchEmployeeComments = async (id: string) => {
  /*   const res = await api.get(`/mood/employeeComments/${id}`);
  return res.data;
  return tempEmployeeComments; */
};

export const rateOthers = async (payload: any) => {
  const res = await api.post("/mood/rateOthers", payload);
  return res.data;
};
