import { changeEmailPreference } from "../../repositories";

export const updateEmailPreferenceService = async () => {
  const data = await changeEmailPreference();
  return data;
};
