import { fetchSurveys } from "../../repositories";

export const listService = async () => {
  const data = await fetchSurveys();
  const updatedData = data.map((item: any) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));
  return updatedData;
};
