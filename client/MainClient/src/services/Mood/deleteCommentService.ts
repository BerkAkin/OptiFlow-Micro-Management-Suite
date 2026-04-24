import { DeleteEmployeeComment } from "../../repositories";

export const deleteCommentService = async (payload: any) => {
  const data = await DeleteEmployeeComment(payload);
  return data;
};
