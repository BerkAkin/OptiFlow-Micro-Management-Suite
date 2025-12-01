import { fetchCategoricalData } from "../../repositories/FinanceRepositories/FinanceRepository";

export const CategoricalService = async () => {
  const data = await fetchCategoricalData();

  const categories = data.Expenses.map((item) => {
    return item ? item.category : "";
  });

  const values = data.Expenses.map((item) => {
    return item ? item.value : 0;
  });

  return { categories, values };
};
