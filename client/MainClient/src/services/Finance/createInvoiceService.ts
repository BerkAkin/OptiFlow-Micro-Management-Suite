import { createInvoice } from "../../repositories";

export const createInvoiceService = async (payload: any) => {
  const data = await createInvoice(payload);
  return data;
};
