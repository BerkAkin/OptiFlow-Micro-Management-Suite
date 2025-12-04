import { fetchEmployeeComments } from "../../repositories/SupportRepositories/SupportRepository";

export const EmployeeCommentsSupportService = async (id: number) => {
  const data = await fetchEmployeeComments(id);
  return data;
};
