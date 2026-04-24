import { changeProfilePicture } from "../../repositories";

export const updateProfilePictureService = async (formData: FormData) => {
  const data = await changeProfilePicture(formData);
  return data;
};
