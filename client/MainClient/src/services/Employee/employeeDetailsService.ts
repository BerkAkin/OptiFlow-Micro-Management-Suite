import { getEmployeeDetails } from "../../repositories";

export const employeeDetailsService = async (email: string) => {
  const data = await getEmployeeDetails(email);
  return data;
};
