import { api } from "../../lib/api";

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
  const res = await api.get("/finance/Installments", {
    params: { ...filters, page },
  });
  return res.data;
};

export const fetchRecurrent = async (filters: any, page: number) => {
  const res = await api.get("/finance/recurrents", {
    params: { ...filters, page },
  });
  return res.data;
};

export const createTransaction = async (payload: any) => {
  const res = await api.post("/finance/", payload);
  return res.data;
};
