import { suggestionSendVote } from "../../repositories/SuggestionRepositories/SuggestionRepository";

export const VoteSuggestionService = async (values: any) => {
  const data = await suggestionSendVote(values);
  return data;
};
