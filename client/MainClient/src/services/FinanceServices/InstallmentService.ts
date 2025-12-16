import { fetchInstallments } from "../../repositories/FinanceRepositories/FinanceRepository";

export const InstallmentService = async (filters: any, page: number) => {
  const data = await fetchInstallments(filters, page);

  return {
    values: data.values,
    maxPage: data.maxPage,
    filterFields: [
      {
        name: "description",
        type: "text" as const,
        placeholder: "Description...",
      },
    ],
  };
};
