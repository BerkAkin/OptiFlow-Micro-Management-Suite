import { createTransaction } from "../../repositories/FinanceRepositories/FinanceRepository";

export const CreateTransaction = async (payload: any) => {
  const data = await createTransaction(payload);
  return data;
};
