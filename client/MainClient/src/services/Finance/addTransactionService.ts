import { createTransaction } from "../../repositories";

export const addTransactionService = async (payload: any) => {
  const data = await createTransaction(payload);
  return data;
};
