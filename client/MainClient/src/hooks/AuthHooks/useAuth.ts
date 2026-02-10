import { useMutation } from "@tanstack/react-query";
import { loginService } from "../../services/AuthServices/LoginService";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginService,
  });
};
