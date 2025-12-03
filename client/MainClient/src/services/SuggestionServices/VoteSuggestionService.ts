import { suggestionSendVote } from "../../repositories/SuggestionRepositories/SuggestionRepository";

export const VoteSuggestionService = async (values: any) => {
  const { id, vote } = values;
  const data = await suggestionSendVote({ id: id, vote: vote });
  return data;
};
