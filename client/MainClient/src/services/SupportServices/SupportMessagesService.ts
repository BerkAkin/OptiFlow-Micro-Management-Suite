import { fetchSupportMessages } from "../../repositories/SupportRepositories/SupportRepository";

export const SupportMessagesService = async (requestId: number) => {
  const data = await fetchSupportMessages(requestId);
  return data;
};
