namespace FinanceModule.DTOs
{
    public class InvoiceProductDto
    {
        public string Category { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal LineTotal => Price * Quantity;
    }
}
