import { fetchEmailPreference } from "../../repositories";

export const emailPreferenceService = async () => {
  const data = await fetchEmailPreference();
  return data;
};
