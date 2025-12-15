using System.ComponentModel.DataAnnotations.Schema;

namespace FinanceModule.Entities
{
    public class Transaction
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public string Name { get; set; }
        public string ByWho { get; set; }
        public string Exchange { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public string Description { get; set; }
        public string Type { get; set; }
        public bool IsPartly { get; set; }
        public int? PartCount { get; set; }
        public decimal Price { get; set; }
        public bool IsIncome { get; set; }
        public string Category { get; set; }
    }
}
