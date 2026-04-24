import { fetchMoods } from "../../repositories";

export const listService = async (filters: any, page: number) => {
  const data = await fetchMoods(filters, page);
  const newData = data.data.map((item: any) => ({
    ...item,
    tags: item.tags.join(","),
  }));
  const returnData = {
    values: newData,
    maxPage: data.maxPage,
    filterFields: [
      { name: "date", type: "date" as const, placeholder: "" },
      {
        name: "mood",
        type: "select" as const,
        options: [
          { label: "Very Sad", value: 1 },
          { label: "Sad", value: 2 },
          { label: "Neutral", value: 3 },
          { label: "Happy", value: 4 },
          { label: "Very Happy", value: 5 },
        ],
      },
    ],
  };
  return returnData;
};
