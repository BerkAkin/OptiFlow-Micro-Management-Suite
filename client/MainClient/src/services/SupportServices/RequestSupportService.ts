import { requestSupport } from "../../repositories/SupportRepositories/SupportRepository";

export const RequestSupportService = async (payload: any) => {
  const data = await requestSupport(payload);
  return data;
};
