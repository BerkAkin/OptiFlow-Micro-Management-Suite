import { fetchDayoffs } from "../../repositories";

export const listDayoffsService = async () => {
  const data = await fetchDayoffs();
  return data;
};
