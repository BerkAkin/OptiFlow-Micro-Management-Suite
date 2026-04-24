import { approveOrRejectDayoffRequest } from "../../repositories";

export const updateDayoffService = async (payload: any) => {
  const data = await approveOrRejectDayoffRequest(payload);
  return data;
};
