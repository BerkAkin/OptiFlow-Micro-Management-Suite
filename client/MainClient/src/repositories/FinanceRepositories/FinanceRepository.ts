import { api } from "../../lib/api";

const installmentData = {
  maxPage: 2,
  values: [
    {
      description: "Denemeler",
      date: "2025.02.12",
      parts: "2/4",
      price: 5000,
      detail: "/dtl/ins/1",
    },
  ],

  filterFields: [
    {
      name: "description",
      type: "text" as const,
      placeholder: "Description...",
    },
  ],
};

const recurrentData = {
  maxPage: 6,
  values: [
    {
      description: "Deneme",
      price: 123,
      to: "Berk",
      recurs: "25th",
    },
  ],
  filterFields: [
    {
      name: "description",
      placeholder: "Description...",
      type: "text" as const,
    },
    { name: "to", placeholder: "To", type: "text" as const },
  ],
};

export const fetchMonthlyData = async () => {
  try {
    const res = await api.get("/finance/MonthlySummary");
    return res.data;
  } catch (e: any) {
    console.log(e);
  }
};

export const fetchCategoricalData = async () => {
  try {
    const res = await api.get("/finance/CategoricalSummary");
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMostData = async () => {
  const res = await api.get("/finance/MostCategoricalSummary");
  return res.data;
};

export const fetchLatestActivity = async (filters: any, page: number) => {
  const res = await api.get("/finance/", {
    params: { type: filters.type, date: filters.date, page },
  });
  return res.data;
};

export const fetchInstallments = async (filters: any, page: number) => {
  /*  const res  = await api.get('/api/finance/installements',{params:{...filters,page}});
  //return res.data*/

  return installmentData;
};

export const fetchRecurrent = async (filters: any, page: number) => {
  /* const res= await api.get('/api/finance/remainings',{params:{...filters,page}}); */
  //return res.data

  return recurrentData;
};

export const createTransaction = async (payload: any) => {
  const res = await api.post("/api/finance/transactions", payload);
  return res.data;
};
