import { fetchSurveyResult } from "../../repositories/SurveyRepositories/SurveyRepository";

export const SurveyResultService = async (id: number) => {
  const data = await fetchSurveyResult(id);
  return data;
};
