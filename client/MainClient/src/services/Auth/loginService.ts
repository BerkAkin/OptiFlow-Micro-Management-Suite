import { login } from "../../repositories";

export const loginService = async (payload: any) => {
  return await login(payload);
};
