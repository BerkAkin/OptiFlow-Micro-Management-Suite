import { login } from "../../repositories/AuthRepositories/AuthRepository";

export const loginService = async (payload: any) => {
  return await login(payload);
};
