import { changePassword } from "../../repositories";

export const changePasswordService = async (payload: any) => {
  return await changePassword(payload);
};
