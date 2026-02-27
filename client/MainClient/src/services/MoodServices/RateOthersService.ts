import { rateOthers } from "../../repositories/MoodRepositories/MoodRepository";

export const RateOthersService = async (payload: any) => {
  const data = await rateOthers(payload);
  return data;
};
