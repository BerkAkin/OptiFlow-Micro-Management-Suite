import { suggestionSendComment } from "../../repositories/SuggestionRepositories/SuggestionRepository";

export const CommentSuggestionService = async (values: any) => {
  const { id, text } = values;
  const data = await suggestionSendComment({ id: id, text: text });
  return data;
};
