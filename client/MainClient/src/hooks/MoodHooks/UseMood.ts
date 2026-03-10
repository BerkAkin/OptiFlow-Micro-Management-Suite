import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RecordMoodService } from "../../services/MoodServices/RecordMoodService";
import { AllPreviousMoodsService } from "../../services/MoodServices/AllPreviousMoodsService";
import { MoodChartService } from "../../services/MoodServices/MoodChartService";
import { MyCommentsService } from "../../services/MoodServices/MyCommentsService";
import { CommentOnEmployeesService } from "../../services/MoodServices/CommentOnEmployeesService";
import { UsersService } from "../../services/MoodServices/UsersService";
import { EmployeeCommentsService } from "../../services/MoodServices/EmployeeCommentsService";
import { DeleteCommentService } from "../../services/MoodServices/DeleteCommentService";

export const useRecordMood = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => RecordMoodService(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allPreviousMoods"] });
      queryClient.invalidateQueries({ queryKey: ["moodsPrevious"] });
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

export const usePreviousMoods = () => {
  return useQuery({
    queryKey: ["moodsPrevious"],
    queryFn: () => MoodChartService(),
  });
};

export const useMyComments = () => {
  return useQuery({
    queryKey: ["myComments"],
    queryFn: () => MyCommentsService(),
  });
};

export const useEmployeeComments = (userId: any) => {
  return useQuery({
    queryKey: ["employeeComments", userId],
    queryFn: () => EmployeeCommentsService(userId),
  });
};

export const useUserList = () => {
  return useQuery({
    queryKey: ["moodUsers"],
    queryFn: () => UsersService(),
  });
};

export const useCommentOnEmployees = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: any) => CommentOnEmployeesService(values),
    onSuccess: (data: any) => {
      console.log("Commented successfully!", data);
      queryClient.invalidateQueries({ queryKey: ["employeeComments"] });
      queryClient.invalidateQueries({ queryKey: ["myComments"] });
    },
    onError: (error: any) => {
      console.log("Error", error);
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => DeleteCommentService(payload),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["employeeComments"] });
      queryClient.invalidateQueries({ queryKey: ["myComments"] });
      console.log("Comment Deleted successfully!", data);
    },
    onError: (error: any) => {
      console.log("Error", error);
    },
  });
};
