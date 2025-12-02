import { fetchSurveyResult } from "../../repositories/SurveyRepositories/SurveyRepository";

export const SurveyResultService = async (slug: string) => {
  const data = await fetchSurveyResult(slug);
  return data;
};
