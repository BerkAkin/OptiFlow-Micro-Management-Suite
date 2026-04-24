import { resetPassword } from "../../repositories";

export const resetPasswordService = async (data: any) => {
  const values = await resetPassword(data);
  return values;
};
