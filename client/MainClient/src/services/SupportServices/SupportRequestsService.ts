import { fetchSupportRequests } from "../../repositories/SupportRepositories/SupportRepository";

export const SupportRequestsService = async () => {
  const data = await fetchSupportRequests();

  const categories = [
    "Environment",
    "Colleagues",
    "Workload",
    "Mood",
    "System",
    "General",
  ];

  const categoricalData: Record<number, string> = {};
  categories.forEach((item, index) => {
    categoricalData[index + 1] = item;
  });

  const newdata = data.map((item: any) => ({
    ...item,
    category: categoricalData[item.category],
    createdAt: item.createdAt.split("T")[0].split("-").reverse().join("."),
    userName:
      item.userName.charAt(0).toUpperCase() +
      item.userName.slice(1).toLowerCase(),
  }));
  return newdata;
};
