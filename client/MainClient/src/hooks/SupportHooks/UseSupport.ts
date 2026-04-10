import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MonthlySupportService } from "../../services/SupportServices/MonthlySupportService";
import { CategoricalSupportService } from "../../services/SupportServices/CategoricalSupportService";
import { RequestSupportService } from "../../services/SupportServices/RequestSupportService";
import { SupportRequestsService } from "../../services/SupportServices/SupportRequestsService";
import { SupportMessagesService } from "../../services/SupportServices/SupportMessagesService";
import { SendSupportRequestMessageService } from "../../services/SupportServices/SendSupportRequestMessageService";
import { MarkAsClosedService } from "../../services/SupportServices/MarkAsClosedService";
import { UserListService } from "../../services/SupportServices/UserListService";
import { SupportMyDayOffsService } from "../../services/SupportServices/SupportMyDayOffsService";
import { SupportDayOffsService } from "../../services/SupportServices/SupportDayOffsService";
import { ApproveOrRejectDayOffRequestService } from "../../services/SupportServices/ApproveOrRejectDayOffRequestService";
import { RequestDayOffService } from "../../services/SupportServices/RequestDayOffService";

export const useMonthlySupport = () => {
  return useQuery({
    queryKey: ["supportMonthly"],
    queryFn: MonthlySupportService,
  });
};

export const useCategoricalSupport = () => {
  return useQuery({
    queryKey: ["supportCategorical"],
    queryFn: () => CategoricalSupportService(),
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

export const useMarkAsClosed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => MarkAsClosedService(id),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["supportRequests"] });
    },
  });
};

export const useUserList = () => {
  return useQuery({
    queryKey: ["UserList"],
    queryFn: () => UserListService(),
  });
};

export const useMyDayOffs = (filters: any, page: number) => {
  return useQuery({
    queryKey: ["MyDayOffs", JSON.stringify(filters), page],
    queryFn: () => SupportMyDayOffsService(filters, page),
  });
};

export const useDayOffs = () => {
  return useQuery({
    queryKey: ["DayOffs"],
    queryFn: () => SupportDayOffsService(),
  });
};

export const useApproveOrRejectDayOff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ payload }: any) =>
      ApproveOrRejectDayOffRequestService(payload),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["DayOffs"] });
      console.log(data);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};

export const useRequestDayOff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload }: any) => RequestDayOffService(payload),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["MyDayOffs"] });
      console.log(data);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};
