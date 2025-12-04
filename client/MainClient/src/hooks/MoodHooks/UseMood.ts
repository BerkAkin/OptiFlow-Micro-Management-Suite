import { useMutation, useQuery } from "@tanstack/react-query";
import { RecordMoodService } from "../../services/MoodServices/RecordMoodService";
import { TodaysMoodsService } from "../../services/MoodServices/TodaysMoodsService";
import { MoodChartService } from "../../services/MoodServices/MoodChartService";

export const useRecordMood = () => {
  return useMutation({
    mutationFn: (payload: any) => RecordMoodService(payload),
    onSuccess: (data: any) => {
      console.log("Mood recorded successfully!", data);
    },
    onError: (error: any) => {
      console.log("Error", error);
    },
  });
};

export const useTodaysMoods = (filters: any, page: number, id?: number) => {
  return useQuery({
    queryKey: ["moodsToday", JSON.stringify(filters), page],
    queryFn: () => TodaysMoodsService(filters, page, id),
  });
};

export const usePreviousMoods = (id: number) => {
  return useQuery({
    queryKey: ["moodsPrevious", id],
    queryFn: () => MoodChartService(id),
  });
};
