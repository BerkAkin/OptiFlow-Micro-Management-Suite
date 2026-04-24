import { fetchRecurrent } from "../../repositories";

export const recurrentService = async (filters: any, page: number) => {
  const data = await fetchRecurrent(filters, page);

  return {
    values: data.values,
    maxPage: data.maxPage,
    filterFields: [
      {
        name: "description",
        placeholder: "Description...",
        type: "text" as const,
      },
    ],
  };
};
