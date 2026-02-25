import { useMutation, useQuery } from "@tanstack/react-query";
import { MonthlySupportService } from "../../services/SupportServices/MonthlySupportService";
import { CategoricalSupportService } from "../../services/SupportServices/CategoricalSupportService";
import { RateOthersService } from "../../services/SupportServices/RateOthersService";
import { RequestSupportService } from "../../services/SupportServices/RequestSupportService";
import { SupportRequestsService } from "../../services/SupportServices/EmployeesSupportService";
import { EmployeeCommentsSupportService } from "../../services/SupportServices/EmployeeCommentsSupportService";
import { SupportMessagesService } from "../../services/SupportServices/SupportMessages";

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

export const useSupportRequests = (tenantId: number) => {
  return useQuery({
    queryKey: ["supportRequests"],
    queryFn: () => SupportRequestsService(tenantId),
  });
};

export const useSupportMessages = (requestId: number) => {
  return useQuery({
    queryKey: ["supportRequestMessages"],
    queryFn: () => SupportMessagesService(requestId),
  });
};

export const useSupportEmployeeComments = (id: string) => {
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
