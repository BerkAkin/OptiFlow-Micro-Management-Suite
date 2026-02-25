import { fetchCategoricalSupport } from "../../repositories/SupportRepositories/SupportRepository";

export const CategoricalSupportService = async () => {
  const data = await fetchCategoricalSupport();

  const categories = [
    "Environment",
    "Colleagues",
    "Workload",
    "Mood",
    "System",
    "General",
  ];

  const categoricalData: Record<string, number> = {};

  data.forEach((item: any) => {
    categoricalData[item.categoryName] = item.count;
  });

  const values = categories.map((item) => {
    return categoricalData[item] ?? 0;
  });

  return { categories, values };
};
