import { getProfilePicture } from "../../repositories";

export const profilePictureService = async (fileName: string) => {
  return await getProfilePicture(fileName);
};
