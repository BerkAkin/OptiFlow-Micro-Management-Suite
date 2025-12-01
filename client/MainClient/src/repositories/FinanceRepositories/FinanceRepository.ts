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
    {
      type: "-",
      name: "Deneme 2",
      description: "Denemeler 2",
      by: "Berk",
      date: "2025-12-12",
      exchange: "TL",
      quantity: 1,
      price: 4000,
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
  /*  const res  = api.get('/api/finance/latestActivity'{params:{...filters,page}}); axios oto query string yapıyor*/
  return dataLatestActivity;
};
