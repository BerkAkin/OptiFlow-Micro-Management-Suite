import { fetchEmployees } from "../../repositories/SupportRepositories/SupportRepository";

export const EmployeesSupportService = async () => {
  const data = await fetchEmployees();
  return data;
};
