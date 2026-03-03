import { fetchUserList } from "../../repositories/SupportRepositories/SupportRepository";

export const UserListService = async () => {
  const data = await fetchUserList();
  return data;
};
