import { fetchSurveys } from "../../repositories";

export const listService = async () => {
  const data = await fetchSurveys();
  return data;
};
