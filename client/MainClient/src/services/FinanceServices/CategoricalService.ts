import { fetchCategoricalData } from "../../repositories/FinanceRepositories/FinanceRepository";

export const CategoricalService = async () => {
  const data = await fetchCategoricalData();

  const categories = data.map((item: any) => {
    return item ? item.category : "";
  });

  const values = data.map((item: any) => {
    return item ? item.expense : 0;
  });

  return { categories, values };
};
