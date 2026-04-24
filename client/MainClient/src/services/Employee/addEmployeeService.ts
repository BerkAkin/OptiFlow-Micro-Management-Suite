import { addNewEmployee } from "../../repositories";

export const addNewEmployeeService = async (payload: any) => {
  const data = await addNewEmployee(payload);
  return data;
};
