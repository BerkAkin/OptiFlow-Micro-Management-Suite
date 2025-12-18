using System.Text.Json.Serialization;

namespace FinanceModule.DTOs
{
    public class TransactionDTO
    {
        public string Description { get; set; }
        public string Category { get; set; }
        public bool Income { get; set; }
        public string Who { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string Exchange { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public bool? Partly { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public int? Parts { get; set; }
        public DateTime Date { get; set; }
        public string Invoice { get; set; }
    }
}
