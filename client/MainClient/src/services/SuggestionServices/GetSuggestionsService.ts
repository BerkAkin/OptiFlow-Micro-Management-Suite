import { fetchSuggestions } from "../../repositories/SuggestionRepositories/SuggestionRepository";

export const GetSuggestionsService = async () => {
  const data = await fetchSuggestions();
  return data;
};
