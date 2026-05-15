import { api } from "../lib/api";

export const fetchMonthlyData = async () => {
  try {
    const res = await api.get("/transactions/summaries/monthly");
    return res.data;
  } catch (e: any) {
    console.log(e);
  }
};

export const fetchCategoricalData = async () => {
  try {
    const res = await api.get("/transactions/summaries/categorical");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMostData = async () => {
  const res = await api.get("/transactions/summaries/most");
  return res.data;
};

export const fetchLatestActivity = async (filters: any, page: number) => {
  const res = await api.get("/transactions", {
    params: { type: filters.type, date: filters.date, page },
  });
  return res.data;
};

export const fetchRecurrent = async (filters: any, page: number) => {
  const res = await api.get("/transactions/recurrents", {
    params: { ...filters, page },
  });
  return res.data;
};

export const fetchInstallments = async (filters: any, page: number) => {
  const res = await api.get("/transactions/installments", {
    params: { ...filters, page },
  });
  return res.data;
};

export const createTransaction = async (payload: any) => {
  const res = await api.post("/transactions", payload);
  return res.data;
};

export const createInvoice = async (payload: any) => {
  console.log("Gönderilen Veri:", payload);
  const res = await api.post("/invoices", payload, {
    responseType: "blob",
  });
  return res.data;
};
