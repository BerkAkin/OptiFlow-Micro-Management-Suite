import { fetchSurveyResult } from "../../repositories";

export const resultsService = async (id: number) => {
  const data = await fetchSurveyResult(id);
  return data;
};
