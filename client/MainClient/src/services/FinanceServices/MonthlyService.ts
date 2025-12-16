import { fetchMonthlyData } from "../../repositories/FinanceRepositories/FinanceRepository";

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

  const incomeData = months.map((_, index) => {
    const monthNum = index + 1;
    const monthData = data.incomes.find((x: any) => x.month === monthNum);
    return monthData ? monthData.value : 0;
  });

  const expenseData = months.map((_, index) => {
    const monthNum = index + 1;
    const monthData = data.expenses.find((x: any) => x.month === monthNum);
    return monthData ? monthData.value : 0;
  });

  return { months, incomeData, expenseData };
};
