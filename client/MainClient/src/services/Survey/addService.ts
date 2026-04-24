import { sendSurvey } from "../../repositories";

export const addService = async (payload: any) => {
  const data = await sendSurvey(payload);
  return data;
};
