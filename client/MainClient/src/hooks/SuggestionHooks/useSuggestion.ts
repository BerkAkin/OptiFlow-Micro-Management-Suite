import { useMutation, useQuery } from "@tanstack/react-query";
import { GetSuggestionsService } from "../../services/SuggestionServices/GetSuggestionsService";
import { VoteSuggestionService } from "../../services/SuggestionServices/VoteSuggestionService";
import { CommentSuggestionService } from "../../services/SuggestionServices/CommentSuggestionService";
import { ApproveOrRejectSuggestionService } from "../../services/SuggestionServices/ApproveOrRejectSuggestionService";
import { SuggestionShowcaseService } from "../../services/SuggestionServices/SuggestionShowcaseService";
import { MakeSuggestionService } from "../../services/SuggestionServices/MakeSuggestionService";

export const useSuggestions = () => {
  return useQuery({
    queryKey: ["suggestionList"],
    queryFn: GetSuggestionsService,
  });
};

export const useVote = () => {
  return useMutation({
    mutationFn: (values: any) => VoteSuggestionService(values),
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
    mutationFn: (values: any) => CommentSuggestionService(values),
    onSuccess: (data: any) => {
      console.log("Suggestion comment submitted successfully!", data);
    },
    onError: (error: any) => {
      console.log("Error", error);
    },
  });
};

export const useApprove = () => {
  return useMutation({
    mutationFn: (values: any) => ApproveOrRejectSuggestionService(values),
    onSuccess: (data: any) => {
      console.log("Suggestion decision submitted successfully!", data);
    },
    onError: (error: any) => {
      console.log("Error", error);
    },
  });
};

export const useShowcase = () => {
  return useQuery({
    queryKey: ["suggestionShowcase"],
    queryFn: SuggestionShowcaseService,
  });
};

export const useMakeSuggestion = () => {
  return useMutation({
    mutationFn: (values: any) => MakeSuggestionService(values),
    onSuccess: (data: any) => {
      console.log("Suggestion decision submitted successfully!", data);
    },
    onError: (error: any) => {
      console.log("Error", error);
    },
  });
};
