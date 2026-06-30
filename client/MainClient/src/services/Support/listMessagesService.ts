import { fetchSupportMessages } from "../../repositories";

export const listMessagesService = async (requestId: number) => {
  const data = await fetchSupportMessages(requestId);
  const newData = data.map((item: any) => ({
    ...item,
    createdAt: new Date(item.createdAt).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));
  return newData;
};
