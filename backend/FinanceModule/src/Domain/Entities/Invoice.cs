using FinanceModule.Domain.Entities;

namespace FinanceModule.Entities
{
    public class Invoice
    {
        public int Id { get; set; }
        public string Firstname { get; private set; }
        public string Lastname { get; private set; }
        public string Address { get; private set; }
        public string PhoneNum { get; private set; }
        public string PersonSerialNum { get; private set; }
        public string Email { get; private set; }
        public DateTime InvoiceDate { get; private set; }
        public DateTime OrderDate { get; private set; }
        public decimal SubTotal { get; private set; }
        public decimal GrandTotal { get; private set; }

        public TenantSummary TenantSummary { get; private set; }
        public int TenantSummaryId { get; private set; }

        private readonly List<InvoiceProducts> _products = new();
        public IReadOnlyCollection<InvoiceProducts> Products => _products;
        private Invoice() { }
    
        public Invoice(
            string firstName,string lastName, string address, 
            string personSerialNum, string phoneNum, 
            string email, DateTime orderDate
            ) 
        {
            this.Firstname = firstName;
            this.Lastname = lastName;
            this.Address = address;
            this.PersonSerialNum = personSerialNum;
            this.PhoneNum = phoneNum;
            this.Email = email;
            this.InvoiceDate = DateTime.UtcNow;
            this.OrderDate = orderDate;
            this.SubTotal = 0;
            this.GrandTotal = 0;
        }

        public void AddProduct(string category, string description, int quantity, decimal price)
        {
            _products.Add(new InvoiceProducts(category, description, quantity, price));
            this.SubTotal += (quantity * price);
            this.GrandTotal = this.SubTotal * 1.20m;
        }
    
    }

    
}
