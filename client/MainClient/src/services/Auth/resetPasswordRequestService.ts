import { resetPasswordRequest } from "../../repositories";

export const resetPasswordRequestService = async (data: any) => {
  const values = await resetPasswordRequest(data);
  return values;
};
