namespace FinanceModule.DTOs
{
    public class InvoiceDto
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Address { get; set; }
        public string PhoneNum { get; set; }
        public string PersonSerialNum { get; set; }
        public string Email { get; set; }
        public string InvoiceDate { get; set; }
        public List<InvoiceProductDto> Products { get; set; }
        public decimal SubTotal => Products.Sum(p => p.Price * p.Quantity);
        public decimal TaxRate { get; set; } = 10;
        public decimal GrandTotal => SubTotal + (SubTotal * TaxRate / 100);
    }
}
