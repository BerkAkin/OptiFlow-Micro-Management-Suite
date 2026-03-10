import { fetchEmployeeComments } from "../../repositories/MoodRepositories/MoodRepository";

export const EmployeeCommentsService = async (userId: string) => {
  const data = await fetchEmployeeComments(Number(userId));
  const newData = data.map((item: any) => ({
    ...item,
    date: item.date.split("T")[0].split("-").reverse().join("."),
  }));
  return newData;
};
