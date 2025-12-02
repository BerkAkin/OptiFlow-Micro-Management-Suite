import { useQuery, useMutation } from "@tanstack/react-query";
import { SurveyListService } from "../../services/SurveyServices/SurveyListService";
import { SurveyDetailsService } from "../../services/SurveyServices/SurveyDetailsService";
import { sendSurveyAnswersService } from "../../services/SurveyServices/SendSurveyAnswersService";
import { SurveyResultService } from "../../services/SurveyServices/SurveyResultService";

export const useSurveys = () => {
  return useQuery({
    queryKey: ["surveyList"],
    queryFn: SurveyListService,
  });
};

export const useSurveyDetails = (slug: string) => {
  return useQuery({
    queryKey: ["surveyDetails", slug],
    queryFn: () => SurveyDetailsService(slug),
  });
};

export const useSubmitSurvey = () => {
  return useMutation({
    mutationFn: ({ surveyId, answers }: { surveyId: number; answers: any }) =>
      sendSurveyAnswersService(surveyId, answers),
    onSuccess: (data: any) => {
      console.log("Survey answers submitted successfully!", data);
    },
    onError: (error: any) => {
      console.log("Error", error);
    },
  });
};

export const useSurveyResult = (slug: string) => {
  return useQuery({
    queryKey: ["surveyResult", slug],
    queryFn: () => SurveyResultService(slug),
  });
};
