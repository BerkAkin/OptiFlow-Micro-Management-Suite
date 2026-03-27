import { requestDayOff } from "../../repositories/SupportRepositories/SupportRepository";

export const RequestDayOffService = async (payload: any) => {
  const data = await requestDayOff(payload);
  return data;
};
