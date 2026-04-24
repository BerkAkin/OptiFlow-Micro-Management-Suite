import { fetchUsersMood } from "../../repositories";

export const listEmployees = async () => {
  const data = await fetchUsersMood();
  const newData = data.map((item: any) => ({
    value: item.userId,
    label: item.employee,
  }));
  return newData;
};
