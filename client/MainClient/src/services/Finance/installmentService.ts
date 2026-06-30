import { fetchInstallments } from "../../repositories";

export const installmentService = async (filters: any, page: number) => {
  const data = await fetchInstallments(filters, page);

  return {
    values: data.values.map((item: any) => ({
      ...item,
      date: new Date(item.date).toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    })),
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
