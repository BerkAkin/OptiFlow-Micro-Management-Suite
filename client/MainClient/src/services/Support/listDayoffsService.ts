import { fetchDayoffs } from "../../repositories";

export const listDayoffsService = async () => {
  const data = await fetchDayoffs();
  const updatedData = data.map((item: any) => ({
    ...item,
    startingDate: new Date(item.startingDate).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));
  return updatedData;
};
