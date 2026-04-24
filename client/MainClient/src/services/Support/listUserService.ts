import { fetchUserList } from "../../repositories";

export const listUserService = async () => {
  const data = await fetchUserList();
  return data;
};
