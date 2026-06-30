import { fetchLatestActivity } from "../../repositories";

export const transactionsService = async (filters: any, page: number) => {
  const data = await fetchLatestActivity(filters, page);
  return {
    values: data.values.map((item: any) => ({
      ...item,
      date: new Date(item.date).toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    })),
    maxPage: data.maxPage,
    filterFields: [
      { name: "date", type: "date" as const, placeholder: "" },
      {
        name: "type",
        type: "select" as const,
        placeholder: "",
        options: [
          { label: "Income", value: "1" },
          { label: "Expense", value: "0" },
        ],
      },
    ],
  };
};
