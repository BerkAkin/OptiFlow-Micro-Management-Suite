import { fetchEmployees } from "../../repositories";

export const employeesService = async (filters: any, page: number) => {
  const res = await fetchEmployees(filters, page);
  return {
    values: res.data.map((item: any) => ({
      ...item,
      birthDate: new Date(item.birthDate).toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    })),
    maxPage: res.maxPage,
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
