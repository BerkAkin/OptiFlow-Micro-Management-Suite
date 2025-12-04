import { api } from "../../lib/api";

const tempSupportMonthly = [
  { month: "January", value: 245 },
  { month: "February", value: 173 },
  { month: "March", value: 836 },
  { month: "April", value: 567 },
];

const tempSupportCategorical = [
  { category: "Employees", value: 53 },
  { category: "Stress", value: 183 },
  { category: "Environment", value: 128 },
  { category: "Family", value: 21 },
  { category: "Friends", value: 33 },
];

const tempEmployees = [
  {
    id: 0,
    name: "Berk Akın",
    img: "Image",
    stars: "3",
    votes: 400,
  },
];

const tempEmployeeComments = [
  {
    user: "Murat Eke",
    comment: "Bu çalışan gerçekten çok çalışıyor",
    stars: 5,
    date: "25.11.2025",
  },
  {
    user: "Mandrake Elbow",
    comment: "Kendisini sevmiyorum kudursun",
    stars: 2,
    date: "15.07.2023",
  },
];

export const fetchMonthlySupport = async () => {
  /*   const res = await api.get("/api/support/monthly");
  return res.data; */
  return tempSupportMonthly;
};

export const fetchCategoricalSupport = async () => {
  /*   const res = await api.get("/api/support/categorical");
  return res.data; */
  return tempSupportCategorical;
};

export const fetchEmployees = async () => {
  /*   const res = await api.get("/api/support/employees");
  return res.data; */
  return tempEmployees;
};

export const fetchEmployeeComments = async (id: number) => {
  /*   const res = await api.get(`/api/support/employeeComments/${id}`);
  return res.data; */
  return tempEmployeeComments;
};

export const rateOthers = async (payload: any) => {
  const res = await api.post("/api/support/rateOthers", payload);
  return res.data;
};

export const requestSupport = async (payload: any) => {
  const res = await api.post("/api/support/request", payload);
  return res.data;
};
