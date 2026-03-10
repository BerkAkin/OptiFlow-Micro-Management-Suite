import { fetchMyComments } from "../../repositories/MoodRepositories/MoodRepository";

export const MyCommentsService = async () => {
  const data = await fetchMyComments();
  const newData = data.map((item: any) => ({
    ...item,
    date: item.date.split("T")[0].split("-").reverse().join("."),
  }));
  return newData;
};
