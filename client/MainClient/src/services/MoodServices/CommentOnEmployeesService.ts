import { CommentOnEmployees } from "../../repositories/MoodRepositories/MoodRepository";

export const CommentOnEmployeesService = async (payload: any) => {
  const data = await CommentOnEmployees(payload);
  return data;
};
