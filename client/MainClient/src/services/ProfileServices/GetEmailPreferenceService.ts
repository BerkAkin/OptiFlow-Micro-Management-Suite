import { fetchEmailPreference } from "../../repositories/ProfileRepositories/ProfileRepository";

export const GetEmailPreferenceService = async () => {
  const data = await fetchEmailPreference();
  return data;
};
