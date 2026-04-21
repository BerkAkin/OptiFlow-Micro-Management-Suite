import { resetPasswordRequest } from "../../repositories/AuthRepositories/AuthRepository";

export const resetPasswordRequestService = async (data: any) => {
  const values = await resetPasswordRequest(data);
  return values;
};
