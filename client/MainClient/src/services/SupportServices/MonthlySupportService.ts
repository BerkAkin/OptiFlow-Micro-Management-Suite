import { fetchMonthlySupport } from "../../repositories/SupportRepositories/SupportRepository";

export const MonthlySupportService = async () => {
  const data = await fetchMonthlySupport();

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

  const monthMap: Record<number, number> = {};

  data.forEach((item: any) => {
    monthMap[item.month] = item.count;
  });

  const newData = months.map((_, index) => monthMap[index + 1] ?? 0);

  return { months, newData };
};
