import { fetchMySuggestions } from "../../repositories/SuggestionRepositories/SuggestionRepository";

export const GetMySuggestionsService = async () => {
  const data = await fetchMySuggestions();
  return data;
};
