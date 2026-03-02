import { markAsClosed } from "../../repositories/SupportRepositories/SupportRepository";

export const MarkAsClosedService = async (id: number) => {
  const data = await markAsClosed(id);
  return data;
};
