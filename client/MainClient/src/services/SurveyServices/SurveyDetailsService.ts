import { fetchSurveyDetails } from "../../repositories/SurveyRepositories/SurveyRepository";

export const SurveyDetailsService = async (slug: string) => {
  const data = await fetchSurveyDetails(slug);
  return data;
};
