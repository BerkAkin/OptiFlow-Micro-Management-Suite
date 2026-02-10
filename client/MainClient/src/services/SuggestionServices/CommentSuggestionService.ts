import { suggestionSendComment } from "../../repositories/SuggestionRepositories/SuggestionRepository";

export const CommentSuggestionService = async (values: any) => {
  const data = await suggestionSendComment(values);
  return data;
};
