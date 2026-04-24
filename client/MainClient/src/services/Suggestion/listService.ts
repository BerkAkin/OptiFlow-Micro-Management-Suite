import { fetchSuggestions } from "../../repositories";

export const listService = async () => {
  const data = await fetchSuggestions();
  return data;
};
