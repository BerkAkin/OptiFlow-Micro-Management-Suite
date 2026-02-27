import { fetchSupportMessages } from "../../repositories/SupportRepositories/SupportRepository";

export const SupportMessagesService = async (requestId: number) => {
  const data = await fetchSupportMessages(requestId);
  const newData = data.map((item: any) => ({
    ...item,
    createdAt: item.createdAt.split("T")[0].split("-").reverse().join("."),
  }));
  return newData;
};
