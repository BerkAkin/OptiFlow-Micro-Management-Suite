import { fetchMySuggestions } from "../../repositories";

export const minesService = async () => {
  const data = await fetchMySuggestions();
  return data;
};
