using FinanceModule.DTOs;

namespace FinanceModule.Application.DTOs
{
    public class InvoicePdfTemplateDto
    {
        public string Tenant { get; init; }
        public string TenantAddress { get; init; }
        public string TenantPhoneNum { get; init; }
        public string TenantEmail { get; init; }
        public string? TenantFax { get; init; }
        public string TenantTaxBuilding { get; init; }
        public string TenantTaxNumber { get; init; }
        public string TenantMersisNum { get; init; }

        public string Firstname { get; init; }
        public string Lastname { get; init; }
        public string Address { get; init; }
        public string PersonSerialNum { get; init; }
        public string PhoneNum { get; init; }
        public string Email { get; init; }

        public DateTime OrderDate { get; init; }
        public DateTime InvoiceDate { get; init; }

        public List<InvoiceProductDto> Products { get; init; } = new();

        public decimal SubTotal { get; init; }
        public decimal GrandTotal { get; init; }
    }
}