import { useMutation, useQuery } from "@tanstack/react-query";
import { MonthlySupportService } from "../../services/SupportServices/MonthlySupportService";
import { CategoricalSupportService } from "../../services/SupportServices/CategoricalSupportService";
import { RateOthersService } from "../../services/SupportServices/RateOthersService";
import { RequestSupportService } from "../../services/SupportServices/RequestSupportService";
import { EmployeesSupportService } from "../../services/SupportServices/EmployeesSupportService";
import { EmployeeCommentsSupportService } from "../../services/SupportServices/EmployeeCommentsSupportService";

export const useMonthlySupport = () => {
  return useQuery({
    queryKey: ["supportMonthly"],
    queryFn: MonthlySupportService,
  });
};

export const useCategoricalSupport = () => {
  return useQuery({
    queryKey: ["supportCategorical"],
    queryFn: CategoricalSupportService,
  });
};

export const useSupportEmployees = () => {
  return useQuery({
    queryKey: ["supportEmployees"],
    queryFn: EmployeesSupportService,
  });
};

export const useSupportEmployeeComments = (id: number) => {
  return useQuery({
    queryKey: ["supportEmployeeComments", id],
    queryFn: () => EmployeeCommentsSupportService(id),
  });
};

export const useRateOthers = () => {
  return useMutation({
    mutationFn: (values: any) => RateOthersService(values),
    onSuccess: (data: any) => {
      console.log("Rating submitted successfully!", data);
    },
    onError: (error: any) => {
      console.log("Error", error);
    },
  });
};

export const useRequestSupport = () => {
  return useMutation({
    mutationFn: (values: any) => RequestSupportService(values),
    onSuccess: (data: any) => {
      console.log("Rating submitted successfully!", data);
    },
    onError: (error: any) => {
      console.log("Error", error);
    },
  });
};
