import { fetchEmployeeComments } from "../../repositories/SupportRepositories/SupportRepository";

export const EmployeeCommentsSupportService = async (id: string) => {
  const data = await fetchEmployeeComments(id);
  return data;
};
