import { fetchDayOffs } from "../../repositories/SupportRepositories/SupportRepository";

export const SupportDayOffsService = async () => {
  const data = await fetchDayOffs();
  return data;
};
