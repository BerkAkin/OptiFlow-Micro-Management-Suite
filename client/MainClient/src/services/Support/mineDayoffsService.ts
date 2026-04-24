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
      date: startingDate,
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
