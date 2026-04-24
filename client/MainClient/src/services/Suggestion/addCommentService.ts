import { suggestionSendComment } from "../../repositories";

export const addCommentService = async (values: any) => {
  const data = await suggestionSendComment(values);
  return data;
};
