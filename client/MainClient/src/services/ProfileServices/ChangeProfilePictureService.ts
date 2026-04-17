import { changeProfilePicture } from "../../repositories/ProfileRepositories/ProfileRepository";

export const changeProfilePictureService = async (formData: FormData) => {
  const data = await changeProfilePicture(formData);
  return data;
};
