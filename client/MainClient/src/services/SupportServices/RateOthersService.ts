import { rateOthers } from "../../repositories/SupportRepositories/SupportRepository";

export const RateOthersService = async (payload: any) => {
  const data = await rateOthers(payload);
  return data;
};
