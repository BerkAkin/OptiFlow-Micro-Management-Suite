import { fetchEmployees } from "../../repositories/EmployeeRepositories/EmployeeRepository";

export const GetEmployeesService = async (filters: any, page: number) => {
  const data = await fetchEmployees(filters, page);
  return {
    values: data.data,
    maxPage: data.maxPage,
    filterFields: [
      {
        name: "FirstName",
        type: "text" as const,
        placeholder: "First Name...",
      },
      { name: "LastName", type: "text" as const, placeholder: "Last Name..." },
    ],
  };
};
