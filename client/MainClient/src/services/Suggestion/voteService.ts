import { suggestionSendVote } from "../../repositories";

export const voteService = async (values: any) => {
  const data = await suggestionSendVote(values);
  return data;
};
