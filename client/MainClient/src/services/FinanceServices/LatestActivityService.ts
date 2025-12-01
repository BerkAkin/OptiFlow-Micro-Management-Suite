import { fetchLatestActivity } from "../../repositories/FinanceRepositories/FinanceRepository";

export const LatestActivityService = async (filters: any, page: number) => {
  const data = await fetchLatestActivity(filters, page);
  return data;
};
