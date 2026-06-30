import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  emailPreferenceService,
  profilePictureService,
  updateEmailPreferenceService,
  updateProfilePictureService,
} from "../services/Profile";
import { deactivateAccountService } from "../services/Profile/deactivateAccountService";

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
      console.log("Email preferences changed successfully");
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
    onError: (err) => console.log(err),
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

export const useDeactivateAccount = () => {
  return useMutation({
    mutationFn: async (formData: any) => deactivateAccountService(formData),

    onSuccess: (data) => {
      console.log(data);
      localStorage.removeItem("AccessToken");
      window.location.reload();
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
