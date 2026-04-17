import { getProfilePicture } from "../../repositories/ProfileRepositories/ProfileRepository";

export const getProfilePictureService = async (fileName: string) => {
  return await getProfilePicture(fileName);
};
