import { changeEmailPreference } from "../../repositories/ProfileRepositories/ProfileRepository";

export const ChangeEmailPreferenceService = async () => {
  const data = await changeEmailPreference();
  return data;
};
