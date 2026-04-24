import { markAsClosed } from "../../repositories";

export const updateRequestService = async (id: number) => {
  const data = await markAsClosed(id);
  return data;
};
