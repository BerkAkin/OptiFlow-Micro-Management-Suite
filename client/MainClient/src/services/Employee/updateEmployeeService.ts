import { updateEmployeeDetails } from "../../repositories";

export const updateEmployeeDetailsService = async (payload: any) => {
  const data = await updateEmployeeDetails(payload);
  return data;
};
