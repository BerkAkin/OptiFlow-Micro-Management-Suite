import { suggestionMake } from "../../repositories/SuggestionRepositories/SuggestionRepository";

export const MakeSuggestionService = async (values: any) => {
  const data = await suggestionMake(values);
  return data;
};
