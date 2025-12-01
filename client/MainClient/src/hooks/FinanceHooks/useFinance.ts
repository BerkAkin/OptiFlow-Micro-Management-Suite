import { useQuery, useMutation } from "@tanstack/react-query";
import { MonthlyService } from "../../services/FinanceServices/MonthlyService";
import { CategoricalService } from "../../services/FinanceServices/CategoricalService";
import { MostService } from "../../services/FinanceServices/MostService";
import { LatestActivityService } from "../../services/FinanceServices/LatestActivityService";
import { InstallmentService } from "../../services/FinanceServices/InstallmentService";

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

export const useInstallments = (filters: any, page: number) => {
  return useQuery({
    queryKey: ["financeInstallment", filters, page],
    queryFn: () => InstallmentService(filters, page),
  });
};
