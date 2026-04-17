import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetEmailPreferenceService } from "../../services/ProfileServices/GetEmailPreferenceService";
import { ChangeEmailPreferenceService } from "../../services/ProfileServices/ChangeEmailPreferenceService";
import { changeProfilePictureService } from "../../services/ProfileServices/ChangeProfilePictureService";
import { getProfilePictureService } from "../../services/ProfileServices/GetProfilePictureService";

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

export const useChangeProfilePicture = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => changeProfilePictureService(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profilePicture"] });
    },
    onError: (err) => console.log("Hata:", err),
  });
};

export const useProfilePicture = (fileName: string | null) => {
  return useQuery({
    queryKey: ["profilePicture", fileName],
    queryFn: async () => {
      if (!fileName) return null;
      const blob = await getProfilePictureService(fileName);
      return URL.createObjectURL(blob);
    },
    enabled: !!fileName,
  });
};
