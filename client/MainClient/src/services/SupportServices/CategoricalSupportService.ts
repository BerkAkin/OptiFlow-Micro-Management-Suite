import { fetchCategoricalSupport } from "../../repositories/SupportRepositories/SupportRepository";

export const CategoricalSupportService = async () => {
  const data = await fetchCategoricalSupport();

  const labels = data.map((item) => {
    return item.category;
  });

  const values = data.map((item) => {
    return item.value;
  });

  return { labels, values };
};
