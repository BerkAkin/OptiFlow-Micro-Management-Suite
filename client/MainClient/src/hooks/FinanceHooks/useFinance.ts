import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MonthlyService } from "../../services/FinanceServices/MonthlyService";
import { CategoricalService } from "../../services/FinanceServices/CategoricalService";
import { MostService } from "../../services/FinanceServices/MostService";
import { LatestActivityService } from "../../services/FinanceServices/LatestActivityService";
import { InstallmentService } from "../../services/FinanceServices/InstallmentService";
import { RecurrentService } from "../../services/FinanceServices/RecurrentService";
import { CreateTransaction } from "../../services/FinanceServices/AddTransactionService";
import { createInvoiceService } from "../../services/FinanceServices/CreateInvoiceService";

export const useMonthly = () => {
  return useQuery({
    queryKey: ["financeMonthly"],
    queryFn: MonthlyService,
  });
};

export const useCategorical = () => {
  return useQuery({
    queryKey: ["financeCategorical"],
    queryFn: CategoricalService,
  });
};

export const useMost = () => {
  return useQuery({
    queryKey: ["financeMost"],
    queryFn: MostService,
  });
};

export const useLatestActivity = (filters: any, page: number) => {
  return useQuery({
    queryKey: ["financeLatestActivity", filters, page],
    queryFn: () => LatestActivityService(filters, page),
  });
};

export const useInstallment = (filters: any, page: number) => {
  return useQuery({
    queryKey: ["financeInstallment", filters, page],
    queryFn: () => InstallmentService(filters, page),
  });
};

export const useRecurrent = (filters: any, page: number) => {
  return useQuery({
    queryKey: ["financeRemainings", filters, page],
    queryFn: () => RecurrentService(filters, page),
  });
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => CreateTransaction(payload),
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
    onSuccess: (data) => {
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
