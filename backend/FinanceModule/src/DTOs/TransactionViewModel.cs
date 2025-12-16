namespace FinanceModule.DTOs
{
    public class TransactionViewModel
    {
        public int Quantity { get; set; }
        public string Who { get; set; }
        public string ExchangeType { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public bool IsIncome { get; set; }
        public bool? IsPartly { get; set; }
        public int? PartCount { get; set; }
        public string Category { get; set; }
        public string InvoicePath { get; set; }
    }
}
