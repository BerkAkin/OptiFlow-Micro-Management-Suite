import { SendSatisfaction } from "../../repositories";

export const satisfactionService = async (payload: any) => {
  const data = await SendSatisfaction(payload);
  return data;
};
