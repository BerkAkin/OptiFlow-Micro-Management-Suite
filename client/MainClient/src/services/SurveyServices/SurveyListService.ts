import { fetchSurveys } from "../../repositories/SurveyRepositories/SurveyRepository";

export const SurveyListService = async () => {
  const data = await fetchSurveys();
  return data;
};
