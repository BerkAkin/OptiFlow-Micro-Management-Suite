using FinanceModule.Entities;

namespace FinanceModule.Domain.Entities
{
    public class InvoiceProducts
    {
        public int Id { get; private set; }
        public string Category { get; private set; }
        public string Description { get; private set; }
        public int Quantity { get; private set; }
        public decimal Price { get; private set; }
        public Invoice Invoice { get; private set; }
        public int InvoiceId { get; private set; }
        private InvoiceProducts() { }

        public InvoiceProducts(string category, string description, int quantity, decimal price)
        {
            this.Category = category;
            this.Description = description;
            this.Quantity = quantity;
            this.Price = price;
        }
    }



}
