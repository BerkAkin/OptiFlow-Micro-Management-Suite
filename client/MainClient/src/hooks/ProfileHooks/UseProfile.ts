import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetEmailPreferenceService } from "../../services/ProfileServices/GetEmailPreferenceService";
import { ChangeEmailPreferenceService } from "../../services/ProfileServices/ChangeEmailPreferenceService";

export const useEmailPreference = () => {
  return useQuery({
    queryKey: ["emailPreference"],
    queryFn: () => GetEmailPreferenceService(),
  });
};

export const useChangeEmailPreference = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => ChangeEmailPreferenceService(),
    onSuccess: () => {
      console.log("Email Servisi Tercihi Değiştirme Başarılı");
      queryClient.invalidateQueries({ queryKey: ["emailPreference"] });
    },
    onError: (error: any) => {
      console.log("Error", error);
    },
  });
};
