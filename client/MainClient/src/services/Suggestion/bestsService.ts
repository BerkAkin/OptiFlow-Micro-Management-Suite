import { fetchSuggestionShowCase } from "../../repositories";

export const bestsService = async () => {
  const data = await fetchSuggestionShowCase();
  return data;
};
