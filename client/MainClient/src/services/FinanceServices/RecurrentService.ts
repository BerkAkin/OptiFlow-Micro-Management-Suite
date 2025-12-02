import { fetchRecurrent } from "../../repositories/FinanceRepositories/FinanceRepository";

export const RecurrentService = async (filters: any, page: number) => {
  const data = await fetchRecurrent(filters, page);
  return data;
};
