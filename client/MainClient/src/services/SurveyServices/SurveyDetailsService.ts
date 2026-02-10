import { fetchSurveyDetails } from "../../repositories/SurveyRepositories/SurveyRepository";

export const SurveyDetailsService = async (id: string) => {
  const data = await fetchSurveyDetails(id);
  return data;
};
