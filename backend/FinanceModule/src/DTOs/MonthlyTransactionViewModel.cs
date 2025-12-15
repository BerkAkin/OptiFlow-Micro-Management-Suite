namespace FinanceModule.DTOs
{
    public class MonthlyTransactionViewModel
    {
        public int Month { get; set; }
        public int Year { get; set; }
        public decimal Income { get; set; }
        public decimal Expense { get; set; }
    }
}
