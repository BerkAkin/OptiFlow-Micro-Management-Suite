import { fetchMoods } from "../../repositories/MoodRepositories/MoodRepository";

export const TodaysMoodsService = async (
  filters: any,
  page: number,
  id?: number
) => {
  const data = await fetchMoods(filters, page, id);
  return data;
};
