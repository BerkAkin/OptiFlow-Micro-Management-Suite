import { getEmployeeDetails } from "../../repositories/EmployeeRepositories/EmployeeRepository";

export const GetEmployeeDetailsService = async (email: string) => {
  const data = await getEmployeeDetails(email);
  return data;
};
