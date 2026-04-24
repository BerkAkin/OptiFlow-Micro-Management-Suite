import { sendMessage } from "../../repositories";

export const sendMessageService = async (payload: any) => {
  const data = await sendMessage(payload);
  return data;
};
