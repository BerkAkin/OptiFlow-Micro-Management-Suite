import { login } from "../../repositories/AuthRepositories/AuthRepository";

export const loginService = async (payload: any) => {
  const data = await login(payload);
  localStorage.setItem("AccessToken", data);
};
