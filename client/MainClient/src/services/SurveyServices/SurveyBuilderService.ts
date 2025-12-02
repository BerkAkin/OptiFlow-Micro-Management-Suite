import { sendSurvey } from "../../repositories/SurveyRepositories/SurveyRepository";

export const SurveyBuilderService = async (payload: any) => {
  const data = await sendSurvey(payload);
  return data;
};
