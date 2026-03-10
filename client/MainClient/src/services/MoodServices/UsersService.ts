import { fetchUsers } from "../../repositories/MoodRepositories/MoodRepository";

export const UsersService = async () => {
  const data = await fetchUsers();
  const newData = data.map((item: any) => ({
    value: item.userId,
    label: item.employee,
  }));
  return newData;
};
