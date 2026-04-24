import { updateEmployeeDetails } from "../../repositories/EmployeeRepositories/EmployeeRepository";

export const UpdateEmployeeDetailsService = async (payload: any) => {
  const data = await updateEmployeeDetails(payload);
  return data;
};
