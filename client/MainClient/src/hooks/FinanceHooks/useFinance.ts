import { useQuery, useMutation } from "@tanstack/react-query";
import { MonthlyService } from "../../services/FinanceServices/MonthlyService";
import { CategoricalService } from "../../services/FinanceServices/CategoricalService";
import { MostService } from "../../services/FinanceServices/MostService";

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
