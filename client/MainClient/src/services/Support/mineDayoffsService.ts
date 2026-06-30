import { fetchMyDayoffs } from "../../repositories";

export const mineDayoffsService = async (filters: any, page: any) => {
  const data = await fetchMyDayoffs(filters, page);

  const cleanedData = data.values.map(
    ({
      id,
      username,
      userId,
      tenantId,
      startingDate,
      status,
      ...rest
    }: any) => ({
      ...rest,
      date: new Date(startingDate).toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: status == 1 ? "Accepted" : status == 2 ? "Rejected" : "Pending",
    }),
  );

  const newData = {
    maxPage: data.maxPage,
    filterFields: [
      { name: "date", type: "date" as const },
      {
        name: "topic",
        type: "text" as const,
        placeholder: "Topic...",
      },
    ],
    data: cleanedData,
  };
  console.log("Filteli sayfalı", newData);
  return newData;
};
