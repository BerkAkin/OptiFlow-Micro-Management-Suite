import { fetchMoodChart } from "../../repositories/MoodRepositories/MoodRepository";

export const MoodChartService = async () => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const data = await fetchMoodChart();
  const values = data.map((item: any) => item.mood);
  return { values, days };
};
