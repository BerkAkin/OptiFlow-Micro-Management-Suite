import { resetPassword } from "../../repositories/AuthRepositories/AuthRepository";

export const resetPasswordService = async (data: any) => {
  const values = await resetPassword(data);
  return values;
};
