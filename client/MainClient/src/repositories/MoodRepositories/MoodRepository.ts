import { api } from "../../lib/api";

const tempMoodData = {
  maxPage: 10,
  values: [
    {
      employee: "Berk Akın",
      mood: "Happy",
      tags: ["Work", "Food", "Weather"],
      date: "30.11.2025",
    },
  ],
  filterFields: [
    { name: "date", type: "date" as const, placeholder: "" },
    {
      name: "mood",
      type: "select" as const,
      options: [
        { label: "Very Sad", value: "verySad" },
        { label: "Sad", value: "sad" },
        { label: "Neutral", value: "neutral" },
        { label: "Happy", value: "happy" },
        { label: "Very Happy", value: "veryHappy" },
      ],
    },
  ],
};

const tempPreviousMoods = [
  { day: "Monday", value: 1 },
  { day: "Tuesday", value: 5 },
  { day: "Wednesday", value: 3 },
  { day: "Thursday", value: 4 },
  { day: "Friday", value: 2 },
];

export const recordMood = async (payload: any) => {
  const res = await api.post("/api/mood", payload);
  return res.data;
};

export const fetchMoods = async (filters: any, page: number, id?: number) => {
  console.log(id, filters, page);
  /*   const res = await api.get(`api/mood/${id}`,{params:{...filters,page}});
  return res.data; */
  return tempMoodData;
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
