import { SendSatisfaction } from "../../repositories/SurveyRepositories/SurveyRepository";

export const sendSatisfactionService = async (payload: any) => {
  const data = await SendSatisfaction(payload);
  return data;
};
