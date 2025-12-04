import { recordMood } from "../../repositories/MoodRepositories/MoodRepository";

export const RecordMoodService = async (payload: any) => {
  const data = await recordMood(payload);
  return data;
};
