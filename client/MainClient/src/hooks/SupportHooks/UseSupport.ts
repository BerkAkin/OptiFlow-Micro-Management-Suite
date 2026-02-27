import { useMutation, useQuery } from "@tanstack/react-query";
import { MonthlySupportService } from "../../services/SupportServices/MonthlySupportService";
import { CategoricalSupportService } from "../../services/SupportServices/CategoricalSupportService";
import { RequestSupportService } from "../../services/SupportServices/RequestSupportService";
import { SupportRequestsService } from "../../services/SupportServices/SupportRequestsService";
import { SupportMessagesService } from "../../services/SupportServices/SupportMessagesService";
import { SendSupportRequestMessageService } from "../../services/SupportServices/SendSupportRequestMessageService";

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

export const useSupportRequests = () => {
  return useQuery({
    queryKey: ["supportRequests"],
    queryFn: () => SupportRequestsService(),
  });
};

export const useSupportMessages = (requestId: number) => {
  return useQuery({
    queryKey: ["supportRequestMessages", requestId],
    queryFn: () => SupportMessagesService(requestId),
  });
};

export const useSendSupportRequestMessage = () => {
  return useMutation({
    mutationFn: (values: any) => SendSupportRequestMessageService(values),
    onSuccess: (data: any) => {
      console.log("Message sent successfully!", data);
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
      console.log("Support requested successfully!", data);
    },
    onError: (error: any) => {
      console.log("Error", error);
    },
  });
};
