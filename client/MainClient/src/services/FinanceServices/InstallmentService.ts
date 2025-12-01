import { fetchInstallments } from "../../repositories/FinanceRepositories/FinanceRepository";

export const InstallmentService = async (filters: any, page: number) => {
  const data = await fetchInstallments(filters, page);
  return data;
};
