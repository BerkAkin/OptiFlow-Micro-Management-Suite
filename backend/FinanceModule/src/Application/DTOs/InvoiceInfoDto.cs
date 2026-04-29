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
        public DateTime OrderDate { get; set; }
        public List<InvoiceProductDto> Products { get; set; }

        public decimal SubTotal => Products.Sum(x=>x.Quantity*x.Price);
        public decimal GrandTotal => SubTotal + ((SubTotal*20)/100) ;

    }
}
