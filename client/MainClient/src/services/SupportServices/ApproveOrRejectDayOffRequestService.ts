import { approveOrRejectDayOffRequest } from "../../repositories/SupportRepositories/SupportRepository";

export const ApproveOrRejectDayOffRequestService = async (payload: any) => {
  const data = await approveOrRejectDayOffRequest(payload);
  return data;
};
