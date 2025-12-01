import { api } from "../../lib/api";

//örnek test datası
const data = {
  Incomes: [
    { month: "January", value: 256 },
    { month: "February", value: 41 },
    { month: "March", value: 423 },
  ],
  Expenses: [
    { month: "January", value: 200 },
    { month: "February", value: 141 },
    { month: "March", value: 356 },
  ],
};

const catData = {
  Expenses: [
    { category: "Food", value: 4000 },
    { category: "Cleaning", value: 1250 },
    { category: "Entertainment", value: 3000 },
    { category: "Transport", value: 4900 },
  ],
};

const dataMost = {
  categories: [
    { category: "Food", value: 450 },
    { category: "Transport", value: 900 },
  ],
};

const dataLatestActivity = {
  maxPage: 10,
  values: [
    {
      type: "+",
      name: "Deneme ",
      description: "Denemeler",
      by: "Work",
      date: "2025-02-12",
      exchange: "$",
      quantity: 3,
      price: 5000,
      invoice: "",
    },
  ],

  filterFields: [
    { name: "date", type: "date" as const, placeholder: "" },
    {
      name: "type",
      type: "select" as const,
      placeholder: "",
      options: [
        { label: "Income", value: "Income" },
        { label: "Expense", value: "Expense" },
      ],
    },
  ],
};

const installmentData = {
  maxPage: 2,
  values: [
    {
      description: "Denemeler",
      date: "2025.02.12",
      parts: "2/4",
      price: 5000,
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

const remainingsData = {
  maxPage: 6,
  values: [
    {
      description: "Deneme",
      Price: 123,
      To: "Berk",
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
  //const res = await api.get("/api/finance/monthly");
  //return res.data
  return data;
};

export const fetchCategoricalData = async () => {
  //const res = await api.get("/api/finance/categorical");
  return catData;
};

export const fetchMostData = async () => {
  /* const res = await api.get('/api/finance/most') */
  return dataMost;
};

export const fetchLatestActivity = async (filters: any, page: number) => {
  /*  const res  = await api.get('/api/finance/latestActivity'{params:{...filters,page}}); axios oto query string yapıyor*/
  return dataLatestActivity;
};

export const fetchInstallments = async (filters: any, page: number) => {
  /*  const res  = await api.get('/api/finance/installements'{params:{...filters,page}}); axios oto query string yapıyor*/
  return installmentData;
};

export const fetchRemainings = async (filters: any, page: number) => {
  /* const res= await api.get('/api/finance/remainings',{params:{...filters,page}}); */
  return remainingsData;
};

export const createTransaction = async (payload: any) => {
  const res = await api.post("/api/finance/transactions", payload);
  return res.data;
};
