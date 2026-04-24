import { CommentOnEmployees } from "../../repositories";

export const addCommentService = async (payload: any) => {
  const data = await CommentOnEmployees(payload);
  return data;
};
