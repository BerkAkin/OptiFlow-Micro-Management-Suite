import { fetchLatestActivity } from "../../repositories/FinanceRepositories/FinanceRepository";

export const LatestActivityService = async (filters: any, page: number) => {
  const data = await fetchLatestActivity(filters, page);
  return {
    values: [...data.values],
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
