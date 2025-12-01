import { fetchMonthlyData } from "../../repositories/FinanceRepositories/FinanceRepository";

interface IncomeExpense {
  month: string;
  value: number;
}

export const MonthlyService = async () => {
  const data = await fetchMonthlyData();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const incomeData = months.map((month) => {
    const item = data.Incomes.find((x: IncomeExpense) => x.month === month);
    return item ? item.value : 0;
  });

  const expenseData = months.map((month) => {
    const item = data.Expenses.find((x: IncomeExpense) => x.month === month);
    return item ? item.value : 0;
  });

  return { months, incomeData, expenseData };
};
