import { addNewEmployee } from "../../repositories/EmployeeRepositories/EmployeeRepository";

export const AddNewEmployeeService = async (payload: any) => {
  const data = await addNewEmployee(payload);
  return data;
};
