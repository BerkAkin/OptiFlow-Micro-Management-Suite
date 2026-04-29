namespace FinanceModule.DTOs
{
    public class MonthlyValueDTO
    {
        public int Month { get; set; }
        public decimal Value { get; set; }
    }
    public class MonthlySummaryDTO
    {
        public List<MonthlyValueDTO> Incomes { get; set; }
        public List<MonthlyValueDTO> Expenses { get; set; }
    }
}
