using FinanceModule.DTOs;

namespace FinanceModule.Entities
{
    public class InvoicePrintModel
    {
        public string Tenant { get; set; }
        public string TenantAddress { get; set; }
        public string TenantPhoneNum { get; set; }
        public string TenantEmail { get; set; }
        public string TenantFax { get; set; }
        public string TenantTaxBuilding { get; set; }
        public string TenantTaxNumber { get; set; }
        public string TenantMersisNum { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Address { get; set; }
        public string PersonSerialNum { get; set; }
        public string PhoneNum { get; set; }
        public string Email { get; set; }
        public DateTime InvoiceDate { get; set; }
        public DateTime OrderDate { get; set; }
        public List<InvoiceProductDto> Products { get; set; }
        public decimal SubTotal { get; set; }
        public decimal TaxRate { get; set; }
        public decimal GrandTotal { get; set; }
    }
}
