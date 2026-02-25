import { api } from "../../lib/api";

const tempRequests = [
  {
    id: 0,
    category: "Environment",
    name: "Berk Akın",
    date: "25-10-2024",
  },
];

const tempMessages = [
  {
    senderId: 0,
    date: "25-10-2021",
    message: "Merhaba bu bir deneme mesajıdır",
  },
  {
    senderId: 1,
    date: "26-10-2021",
    message: "Merhaba bu bir deneme mesajına cevaptır",
  },
  {
    senderId: 0,
    date: "27-10-2021",
    message: "Merhaba",
  },
];

const tempEmployeeComments = [
  {
    comment:
      "Bu çalışan gerçekten çok çalışıyor Bu çalışan gerçekten çok çalışıyor Bu çalışan gerçekten çok",
    date: "25.11.2025",
  },
  {
    comment: "Kendisini sevmiyorum kudursun",
    date: "15.07.2023",
  },
];

export const fetchMonthlySupport = async () => {
  const res = await api.get("/support/GetMonthlySupportRequestsCount");
  return res.data;
};

export const fetchCategoricalSupport = async () => {
  const res = await api.get("/support/GetSupportRequestsCategorical");
  return res.data;
};

export const fetchSupportRequests = async (tenantId: number) => {
  /*   const res = await api.get("/support/employees");
  return res.data; */
  return tempRequests;
};

export const fetchSupportMessages = async (requestId: number) => {
  /*   const res = await api.get("/support/employees");
  return res.data; */
  return tempMessages;
};

export const fetchEmployeeComments = async (id: string) => {
  /*   const res = await api.get(`/support/employeeComments/${id}`);
  return res.data; */
  return tempEmployeeComments;
};

export const rateOthers = async (payload: any) => {
  const res = await api.post("/support/rateOthers", payload);
  return res.data;
};

export const requestSupport = async (payload: any) => {
  const res = await api.post("/support/request", payload);
  return res.data;
};
