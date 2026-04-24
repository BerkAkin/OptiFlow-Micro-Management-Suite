import { fetchSurveyDetails } from "../../repositories";

export const detailsService = async (id: string) => {
  const data = await fetchSurveyDetails(id);
  return data;
};
