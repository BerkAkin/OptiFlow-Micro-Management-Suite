import { requestDayoff } from "../../repositories";

export const addDayoffService = async (payload: any) => {
  const data = await requestDayoff(payload);
  return data;
};
