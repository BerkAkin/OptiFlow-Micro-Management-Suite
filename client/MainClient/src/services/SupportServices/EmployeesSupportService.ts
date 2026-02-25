import { fetchSupportRequests } from "../../repositories/SupportRepositories/SupportRepository";

export const SupportRequestsService = async (tenantId: number) => {
  const data = await fetchSupportRequests(tenantId);
  return data;
};
