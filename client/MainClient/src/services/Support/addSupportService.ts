import { requestSupport } from "../../repositories";

export const addSupportService = async (payload: any) => {
  const data = await requestSupport(payload);
  return data;
};
