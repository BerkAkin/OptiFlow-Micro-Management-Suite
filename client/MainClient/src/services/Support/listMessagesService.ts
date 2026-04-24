import { fetchSupportMessages } from "../../repositories";

export const listMessagesService = async (requestId: number) => {
  const data = await fetchSupportMessages(requestId);
  const newData = data.map((item: any) => ({
    ...item,
    createdAt: item.createdAt.split("T")[0].split("-").reverse().join("."),
  }));
  return newData;
};
