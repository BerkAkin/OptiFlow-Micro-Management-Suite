
namespace FinanceModule.Entities
{
    public class Transaction
    {
        public int Id { get; private set; }
        public int Quantity { get; private set; }
        public string Who { get; private set; }
        public string ExchangeType { get; private set; }
        public DateTime Date { get; private set; }
        public string Description { get; private set; }
        public bool IsPartly { get; private set; }
        public int PartCount { get; private set; }
        public decimal Price { get; private set; }
        public bool IsIncome { get; private set; }
        public string Category { get; private set; }
        public string? InvoicePath { get; private set; }

        public int TenantSummaryId { get; private set; }
        public TenantSummary TenantSummary { get; private set; }


        private Transaction() { }

        public Transaction(int quantity,string who, string exchangeType, DateTime date, string description, bool isPartly, int partCount, decimal price, bool isIncome,string category,string invoicePath)
        {
            this.Quantity = quantity;
            this.Who = who;
            this.ExchangeType = exchangeType;
            this.Date = date;
            this.Description = description;
            this.IsPartly = isPartly;
            this.PartCount = partCount;
            this.Price = price;
            this.IsIncome = isIncome;
            this.Category = category;
            this.InvoicePath = invoicePath;
        }

    }



}
