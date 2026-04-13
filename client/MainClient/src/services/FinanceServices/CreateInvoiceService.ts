import { createInvoice } from "../../repositories/FinanceRepositories/FinanceRepository";

export const createInvoiceService = async (payload: any) => {
  const data = await createInvoice(payload);
  return data;
};
