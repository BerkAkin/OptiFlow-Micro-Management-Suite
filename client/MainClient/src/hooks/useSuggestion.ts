import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addService,
  listService,
  addCommentService,
  bestsService,
  minesService,
  updateStatusService,
  voteService,
} from "../services/Suggestion";

export const useListSuggestions = () => {
  return useQuery({
    queryKey: ["suggestionList"],
    queryFn: () => listService(),
  });
};

export const useMineSuggestions = () => {
  return useQuery({
    queryKey: ["mySuggestionList"],
    queryFn: () => minesService(),
  });
};

export const useVote = () => {
  return useMutation({
    mutationFn: (values: any) => voteService(values),
    onSuccess: (data: any) => {
      console.log("Suggestion vote submitted successfully!", data);
    },
    onError: (error: any) => {
      console.log("Error", error);
    },
  });
};

export const useComment = () => {
  return useMutation({
    mutationFn: (values: any) => addCommentService(values),
    onSuccess: (data: any) => {
      console.log("Suggestion comment submitted successfully!", data);
    },
    onError: (error: any) => {
      console.log("Error", error);
    },
  });
};

export const useUpdateStatus = () => {
  return useMutation({
    mutationFn: (values: any) => updateStatusService(values),
    onSuccess: (data: any) => {
      console.log("Suggestion decision submitted successfully!", data);
    },
    onError: (error: any) => {
      console.log("Error", error);
    },
  });
};

export const useBests = () => {
  return useQuery({
    queryKey: ["suggestionShowcase"],
    queryFn: () => bestsService(),
  });
};

export const useAddSuggestion = () => {
  return useMutation({
    mutationFn: (values: any) => addService(values),
    onSuccess: (data: any) => {
      console.log("Suggestion submitted successfully!", data);
    },
    onError: (error: any) => {
      console.log("Error", error);
    },
  });
};
