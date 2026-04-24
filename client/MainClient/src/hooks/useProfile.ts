import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  emailPreferenceService,
  profilePictureService,
  updateEmailPreferenceService,
  updateProfilePictureService,
} from "../services/Profile";

export const useEmailPreference = () => {
  return useQuery({
    queryKey: ["emailPreference"],
    queryFn: () => emailPreferenceService(),
  });
};

export const useChangeEmailPreference = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => updateEmailPreferenceService(),
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
    mutationFn: (formData: FormData) => updateProfilePictureService(formData),
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
      const blob = await profilePictureService(fileName);
      return URL.createObjectURL(blob);
    },
    enabled: !!fileName,
  });
};
