import { fetchMostData } from "../../repositories/FinanceRepositories/FinanceRepository";

export const MostService = async () => {
  const data = await fetchMostData();

  const categories = data.map((item: any) => (item ? item.category : ""));
  const values = data.map((item: any) => (item ? item.expense : 0));

  return { categories, values };
};
