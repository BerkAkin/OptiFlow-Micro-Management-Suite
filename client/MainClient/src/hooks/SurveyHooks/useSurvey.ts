import { useQuery, useMutation } from "@tanstack/react-query";
import { SurveyListService } from "../../services/SurveyServices/SurveyListService";
import { SurveyDetailsService } from "../../services/SurveyServices/SurveyDetailsService";
import { sendSurveyAnswersService } from "../../services/SurveyServices/SendSurveyAnswersService";
import { SurveyResultService } from "../../services/SurveyServices/SurveyResultService";
import { SurveyBuilderService } from "../../services/SurveyServices/SurveyBuilderService";
import { sendSatisfactionService } from "../../services/SurveyServices/SurveySatisfactionService";

export const useSurveys = () => {
  return useQuery({
    queryKey: ["surveyList"],
    queryFn: SurveyListService,
  });
};

export const useSurveyDetails = (id: any) => {
  return useQuery({
    queryKey: ["surveyDetails", id],
    queryFn: () => SurveyDetailsService(id),
  });
};

export const useSubmitSurvey = () => {
  return useMutation({
    mutationFn: ({ surveyId, answers }: { surveyId: number; answers: any }) =>
      sendSurveyAnswersService(surveyId, answers),
  });
};

export const useSurveyResult = (id: number) => {
  return useQuery({
    queryKey: ["surveyResult", id],
    queryFn: () => SurveyResultService(id),
  });
};

export const useSendSurvey = () => {
  return useMutation({
    mutationFn: (payload: any) => SurveyBuilderService(payload),
    onSuccess: (data: any) => {
      console.log("Survey submitted successfully!", data);
    },
    onError: (error: any) => {
      console.log("Error", error);
    },
  });
};

export const UseSatisfaction = () => {
  return useMutation({
    mutationFn: (payload: any) => sendSatisfactionService(payload),
  });
};
