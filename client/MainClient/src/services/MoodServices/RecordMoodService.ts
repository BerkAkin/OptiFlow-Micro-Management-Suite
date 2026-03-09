import { recordMood } from "../../repositories/MoodRepositories/MoodRepository";

export const RecordMoodService = async (payload: any) => {
  const newValues = { ...payload, moodId: Number(payload.moodId) };
  const data = await recordMood(newValues);
  return data;
};
