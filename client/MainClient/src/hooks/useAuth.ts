import { useMutation } from "@tanstack/react-query";
import {
  loginService,
  changePasswordService,
  resetPasswordRequestService,
  resetPasswordService,
} from "../services/Auth";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginService,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: any) => resetPasswordService(data),
    onError: (error: any) => {
      console.log(error);
    },
    onSuccess: () => {
      console.log("Password Has Been Refreshed Succesfully");
    },
  });
};

export const useResetPasswordRequest = () => {
  return useMutation({
    mutationFn: (data: any) => resetPasswordRequestService(data),
    onError: (error: any) => {
      console.log(error);
    },
    onSuccess: () => {
      console.log("Password Reset Request Mail Has Been Sent");
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: any) => changePasswordService(data),
    onError: (error: any) => {
      console.log("Backend Mesajı:", error.response?.data);
    },
    onSuccess: () => {
      console.log("Password Changed Succesfully");
    },
  });
};
