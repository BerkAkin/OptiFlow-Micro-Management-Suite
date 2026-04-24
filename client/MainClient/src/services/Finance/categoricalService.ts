import { fetchCategoricalData } from "../../repositories/";

export const categoricalService = async () => {
  const data = await fetchCategoricalData();

  const categories = data.map((item: any) => {
    return item ? item.category : "";
  });

  const values = data.map((item: any) => {
    return item ? item.expense : 0;
  });

  return { categories, values };
};
