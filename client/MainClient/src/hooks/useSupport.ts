import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  monthlyService,
  categoricalService,
  listService,
  listMessagesService,
  addSupportService,
  addDayoffService,
  listDayoffsService,
  mineDayoffsService,
  sendMessageService,
  updateDayoffService,
  updateRequestService,
  listUserService,
} from "../services/Support";

export const useMonthlySupport = () => {
  return useQuery({
    queryKey: ["supportMonthly"],
    queryFn: () => monthlyService(),
  });
};

export const useCategoricalSupport = () => {
  return useQuery({
    queryKey: ["supportCategorical"],
    queryFn: () => categoricalService(),
  });
};

export const useListSupport = () => {
  return useQuery({
    queryKey: ["supportRequests"],
    queryFn: () => listService(),
  });
};

export const useMessages = (requestId: number) => {
  return useQuery({
    queryKey: ["supportRequestMessages", requestId],
    queryFn: () => listMessagesService(requestId),
  });
};

export const useSendMessage = () => {
  return useMutation({
    mutationFn: (values: any) => sendMessageService(values),
    onSuccess: (data: any) => {
      console.log("Message sent successfully!", data);
    },
    onError: (error: any) => {
      console.log("Error", error);
    },
  });
};

export const useAddSupportRequest = () => {
  return useMutation({
    mutationFn: (values: any) => addSupportService(values),
    onSuccess: (data: any) => {
      console.log("Support requested successfully!", data);
    },
    onError: (error: any) => {
      console.log("Error", error);
    },
  });
};

export const useMark = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => updateRequestService(id),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["supportRequests"] });
    },
  });
};

export const useSupportUserList = () => {
  return useQuery({
    queryKey: ["UserList"],
    queryFn: () => listUserService(),
  });
};

export const useMineDayoffs = (filters: any, page: number) => {
  return useQuery({
    queryKey: ["MyDayoffs", JSON.stringify(filters), page],
    queryFn: () => mineDayoffsService(filters, page),
  });
};

export const useListDayoffs = () => {
  return useQuery({
    queryKey: ["Dayoffs"],
    queryFn: () => listDayoffsService(),
  });
};

export const useApproveOrRejectDayoff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ payload }: any) => updateDayoffService(payload),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["Dayoffs"] });
      console.log("Updated Successfully");
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};

export const useAddDayoff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload }: any) => addDayoffService(payload),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["MyDayoffs"] });
      console.log(data);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};
