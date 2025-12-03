import { fetchSuggestionShowCase } from "../../repositories/SuggestionRepositories/SuggestionRepository";

export const SuggestionShowcaseService = async () => {
  const data = await fetchSuggestionShowCase();
  return data;
};
