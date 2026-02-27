import { sendMessage } from "../../repositories/SupportRepositories/SupportRepository";

export const SendSupportRequestMessageService = async (payload: any) => {
  const data = await sendMessage(payload);
  return data;
};
