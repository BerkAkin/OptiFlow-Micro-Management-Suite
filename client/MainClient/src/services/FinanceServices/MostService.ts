import { fetchMostData } from "../../repositories/FinanceRepositories/FinanceRepository";

export const MostService = async () => {
  const data = await fetchMostData();

  const categories = data.categories.map((item) => (item ? item.category : ""));
  const values = data.categories.map((item) => (item ? item.value : 0));

  return { categories, values };
};
