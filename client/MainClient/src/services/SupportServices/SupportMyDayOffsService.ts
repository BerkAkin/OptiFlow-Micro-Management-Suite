import { fetchMyDayOffs } from "../../repositories/SupportRepositories/SupportRepository";

export const SupportMyDayOffsService = async () => {
  const data = await fetchMyDayOffs();
  return data;
};
