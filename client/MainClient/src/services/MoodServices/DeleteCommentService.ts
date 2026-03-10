import { DeleteEmployeeComment } from "../../repositories/MoodRepositories/MoodRepository";

export const DeleteCommentService = async (payload: any) => {
  const data = await DeleteEmployeeComment(payload);
  return data;
};
