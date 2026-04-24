import { useQuery, useMutation } from "@tanstack/react-query";
import {
  listService,
  addService,
  detailsService,
  resultsService,
  satisfactionService,
  sendAnswersService,
} from "../services/Survey";

export const useListSurvey = () => {
  return useQuery({
    queryKey: ["surveyList"],
    queryFn: () => listService(),
  });
};

export const useDetailsSurvey = (id: any) => {
  return useQuery({
    queryKey: ["surveyDetails", id],
    queryFn: () => detailsService(id),
  });
};

export const useSubmit = () => {
  return useMutation({
    mutationFn: ({ surveyId, answers }: { surveyId: number; answers: any }) =>
      sendAnswersService(surveyId, answers),
  });
};

export const useResult = (id: number) => {
  return useQuery({
    queryKey: ["surveyResult", id],
    queryFn: () => resultsService(id),
  });
};

export const useAddSurvey = () => {
  return useMutation({
    mutationFn: (payload: any) => addService(payload),
    onSuccess: (data: any) => {
      console.log("Survey submitted successfully!", data);
    },
    onError: (error: any) => {
      console.log("Error", error);
    },
  });
};

export const useSatisfaction = () => {
  return useMutation({
    mutationFn: (payload: any) => satisfactionService(payload),
  });
};
