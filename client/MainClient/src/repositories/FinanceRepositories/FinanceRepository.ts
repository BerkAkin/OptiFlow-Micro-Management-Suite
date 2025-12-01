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

export const fetchMonthlyData = async () => {
  //const res = await api.get("/api/finance/monthly");
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
