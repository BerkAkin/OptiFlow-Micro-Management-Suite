import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  monthlyService,
  categoricalService,
  mostService,
  addTransactionService,
  installmentService,
  recurrentService,
  transactionsService,
  createInvoiceService,
} from "../services/Finance";

export const useMonthlyFinance = () => {
  return useQuery({
    queryKey: ["financeMonthly"],
    queryFn: () => monthlyService(),
  });
};

export const useCategoricalFinance = () => {
  return useQuery({
    queryKey: ["financeCategorical"],
    queryFn: () => categoricalService(),
  });
};

export const useMost = () => {
  return useQuery({
    queryKey: ["financeMost"],
    queryFn: () => mostService(),
  });
};

export const useTransactions = (filters: any, page: number) => {
  return useQuery({
    queryKey: ["financeLatestActivity", filters, page],
    queryFn: () => transactionsService(filters, page),
  });
};

export const useInstallment = (filters: any, page: number) => {
  return useQuery({
    queryKey: ["financeInstallment", filters, page],
    queryFn: () => installmentService(filters, page),
  });
};

export const useRecurrent = (filters: any, page: number) => {
  return useQuery({
    queryKey: ["financeRemainings", filters, page],
    queryFn: () => recurrentService(filters, page),
  });
};

export const useAddTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => addTransactionService(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["financeMonthly"] });
      queryClient.invalidateQueries({ queryKey: ["financeCategorical"] });
      queryClient.invalidateQueries({ queryKey: ["financeMost"] });
      queryClient.invalidateQueries({ queryKey: ["financeLatestActivity"] });
      queryClient.invalidateQueries({ queryKey: ["financeInstallment"] });
      queryClient.invalidateQueries({ queryKey: ["financeRemainings"] });
    },
  });
};

export const useInvoice = () => {
  return useMutation({
    mutationFn: (payload: any) => createInvoiceService(payload),
    onSuccess: (data: any) => {
      const blob = new Blob([data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", `Fatura_${new Date().getTime()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log("Fatura başarıyla oluşturuldu ve indirildi.");
    },
    onError: (error: any) => {
      console.log("Fatura Oluşturma Başarısız");
      console.error(error);
    },
  });
};
