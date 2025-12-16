namespace FinanceModule.DTOs
{
    public class MonthlySummaryViewModel
    {
        public List<MonthlyValueViewModel> Incomes { get; set; }
        public List<MonthlyValueViewModel> Expenses { get; set; }
    }
}
