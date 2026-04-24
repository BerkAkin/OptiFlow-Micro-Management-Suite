import { fetchMoodChart } from "../../repositories";

export const latestService = async () => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const data = await fetchMoodChart();
  const values = data.map((item: any) => item.mood);
  return { values, days };
};
