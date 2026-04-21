import { changePassword } from "../../repositories/AuthRepositories/AuthRepository";

export const changePasswordService = async (payload: any) => {
  return await changePassword(payload);
};
