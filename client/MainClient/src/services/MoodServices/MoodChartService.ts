import { fetchMoodChart } from "../../repositories/MoodRepositories/MoodRepository";

export const MoodChartService = async (id: number) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const data = await fetchMoodChart(id);
  const values = days.map((day) => {
    const item = data.find((x) => x.day === day);
    return item ? item.value : 0;
  });
  return { values, days };
};
