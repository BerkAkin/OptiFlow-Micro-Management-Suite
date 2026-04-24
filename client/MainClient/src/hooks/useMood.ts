import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addService,
  addCommentService,
  deleteCommentService,
  latestService,
  listCommentsService,
  listEmployees,
  listService,
  mineCommentsService,
} from "../services/Mood";

export const useAddMood = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => addService(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allPreviousMoods"] });
      queryClient.invalidateQueries({ queryKey: ["moodsPrevious"] });
    },
    onError: (error: any) => {
      console.log("Error", error);
    },
  });
};

export const UseListMood = (filters: any, page: number) => {
  return useQuery({
    queryKey: ["allPreviousMoods", JSON.stringify(filters), page],
    queryFn: () => listService(filters, page),
  });
};

export const useLatest = () => {
  return useQuery({
    queryKey: ["moodsPrevious"],
    queryFn: () => latestService(),
  });
};

export const useMineComments = () => {
  return useQuery({
    queryKey: ["myComments"],
    queryFn: () => mineCommentsService(),
  });
};

export const useEmployeeComments = (userId: any) => {
  return useQuery({
    queryKey: ["employeeComments", userId],
    queryFn: () => listCommentsService(userId),
  });
};

export const useMoodUserList = () => {
  return useQuery({
    queryKey: ["moodUsers"],
    queryFn: () => listEmployees(),
  });
};

export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: any) => addCommentService(values),
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
    mutationFn: (payload: any) => deleteCommentService(payload),
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
