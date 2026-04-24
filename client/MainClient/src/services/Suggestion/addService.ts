import { suggestionMake } from "../../repositories";

export const addService = async (values: any) => {
  const data = await suggestionMake(values);
  return data;
};
