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

  const newData = months.map((month) => {
    const item = data.find((x: any) => x.month === month);
    return item ? item.value : 0;
  });

  return { months, newData };
};
