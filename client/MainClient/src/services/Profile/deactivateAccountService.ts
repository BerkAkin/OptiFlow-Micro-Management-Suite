import { deactivateAccount } from "../../repositories";

export const deactivateAccountService = async (formData: any) => {
  const data = await deactivateAccount(formData);
  return data;
};
