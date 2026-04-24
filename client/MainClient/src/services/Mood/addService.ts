import { recordMood } from "../../repositories";

export const addService = async (payload: any) => {
  const newValues = { ...payload, moodId: Number(payload.moodId) };
  const data = await recordMood(newValues);
  return data;
};
