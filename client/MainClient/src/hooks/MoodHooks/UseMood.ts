import { useMutation, useQuery } from "@tanstack/react-query";
import { RecordMoodService } from "../../services/MoodServices/RecordMoodService";
import { AllPreviousMoodsService } from "../../services/MoodServices/AllPreviousMoodsService";
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

export const UseAllPreviousMoods = (filters: any, page: number) => {
  return useQuery({
    queryKey: ["allPreviousMoods", JSON.stringify(filters), page],
    queryFn: () => AllPreviousMoodsService(filters, page),
  });
};

export const usePreviousMoods = (id: number) => {
  return useQuery({
    queryKey: ["moodsPrevious", id],
    queryFn: () => MoodChartService(id),
  });
};

/* export const useSupportEmployeeComments = (id: string) => {
  return useQuery({
    queryKey: ["supportEmployeeComments", id],
    queryFn: () => EmployeeCommentsSupportService(id),
  });
};

export const useRateOthers = () => {
  return useMutation({
    mutationFn: (values: any) => RateOthersService(values),
    onSuccess: (data: any) => {
      console.log("Rating submitted successfully!", data);
    },
    onError: (error: any) => {
      console.log("Error", error);
    },
  });
}; */
