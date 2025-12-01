import { fetchRemainings } from "../../repositories/FinanceRepositories/FinanceRepository";

export const RemainingsService = async (filters: any, page: number) => {
  const data = await fetchRemainings(filters, page);
  return data;
};
