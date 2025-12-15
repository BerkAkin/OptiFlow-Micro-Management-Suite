namespace FinanceModule.DTOs
{
    public class TransactionViewModel
    {
        public string Type { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string By { get; set; }
        public DateTime Date { get; set; }
        public string Exchange { get; set; }
        public int Quantity { get; set; }
        public int Price { get; set; }
    }
}
